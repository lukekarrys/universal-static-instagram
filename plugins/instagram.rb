# A Liquid tag for Jekyll sites that allows embedding Instagrams
# by: Luke Karrys
#
# Example usage: {% instagram media_id %}

require 'instagram'
require 'json'
require 'stringex'
require 'yaml'

module Jekyll
  class InstagramTag < Liquid::Tag
    def initialize(tag_name, markup, token)
      super
      access_token_file = File.expand_path "../.instagram/access_token", File.dirname(__FILE__)
      @access_token     = File.open(access_token_file).gets
      @image_res        = "standard_resolution"
      @markup           = markup
      @cache_folder     = File.expand_path "../.instagram/cache", File.dirname(__FILE__)
      FileUtils.mkdir_p @cache_folder
    end

    def render(context)
      id = context.environments.first["page"]["media_id"]
      title = context.environments.first["page"]["title"]
      return "" if id == "" || title == ""
      media = get_cached_media(id) || get_media(id)
      gen_html_output JSON.parse(media), title
    end

    def gen_html_output(media, title)
      config = Jekyll.configuration({})

      loc_name, lat, lon = nil, nil, nil
      id              = media["id"]
      src             = media["images"][@image_res]["url"].gsub("http://", config["absolute_path"] + config["replace_absolute"])
      image_w         = media["images"][@image_res]["width"]
      image_h         = media["images"][@image_res]["height"]
      location        = media["location"]
      filter          = media["filter"]
      link            = media["link"]

      output = "<p><img src='#{src}' alt='#{title}' height='#{image_h}' width='#{image_w}' />"
      output += "<br/>Filtered with #{filter} via <a href='#{link}'>Instagram</a></p>"

      if location
        loc_name      = location["name"]
        lat           = location["latitude"]
        lon           = location["longitude"]
        coords        = "#{lat},#{lon}"
        loc_alt       = loc_name || coords

        output += "<p><a href='http://maps.google.com?q=#{coords}'>"
        output += "<img border='0' "
        output += "src='http://maps.googleapis.com/maps/api/staticmap?center=#{coords}&markers=#{coords}&zoom=14&size=#{image_w}x200&sensor=false' "
        output += "alt='#{loc_alt}' /></a>"
        if loc_name
          output += "<br/>Taken at #{loc_name}"
        end
        output += "</p>"
      end

      output += "<p class='instagram-comment-holder'>"
      output += "<a href='https://instagram.com/oauth/authorize/?client_id=#{config["instagram_client_id"]}&redirect_uri=#{config["instagram_redirect_uri"]}&response_type=token&scope=likes+comments'"
      output += "  id='#{id}' class='instagram-comment-link'>Sign in with Instagram to view Likes and Comments</a></p>"
    end

    def get_cache_file_for(id)
      File.join @cache_folder, "#{id}.cache"
    end

    def cache(id, data)
      cache_file = get_cache_file_for id
      File.open(cache_file, "w") do |io|
        io.write data
      end
    end

    def get_media(id)
      client = Instagram.client(:access_token => @access_token)
      data = client.media_item(id).to_json
      cache id, data unless @cache_disabled
      data
    end

    def get_cached_media(id)
      cache_file = get_cache_file_for id
      File.read cache_file if File.exist? cache_file
    end
  end
end

Liquid::Template.register_tag("instagram", Jekyll::InstagramTag)