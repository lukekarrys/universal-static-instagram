# A Liquid tag to get some cached data based on an instagram id
# by: Luke Karrys
#
# Example usage: {% instagram media_id property %}

require 'instagram'
require 'json'
require 'stringex'
require 'yaml'

module Jekyll
  module AssetFilter
    def instagram_data(input, property)
      access_token_file = File.expand_path "../.instagram/access_token", File.dirname(__FILE__)
      @access_token     = File.open(access_token_file).gets
      @cache_folder     = File.expand_path "../.instagram/cache", File.dirname(__FILE__)
      id = input["media_id"]
      media = get_cached_media(id) || get_media(id)
      get_value JSON.parse(media), property
    end

    def get_value(media, property)
      config = Jekyll.configuration({})
      property.split('.').each{ |p|
        media = media[p]
      }
      media.gsub("http://", config["replace_absolute"])
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

Liquid::Template.register_filter(Jekyll::AssetFilter)