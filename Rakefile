require "highline/import"
require "stringex"
require "instagram"
require "hashie"
require "json"

new_post_ext    = "markdown"  # default new post file extension when using the new_post task
posts_dir       = "_posts"    # directory for blog files

##############
# Instagram  #
##############

instagram_access, instagram_cache = '.instagram/access_token.txt', '.instagram/cache/'
def ready_instagram(access, cache)
  mkdir_p cache, {:verbose => false}
  Instagram.client(:access_token => File.open(access).gets)
end

def get_instagram_cache_file(id, cache_dir)
  File.join cache_dir, "#{id}.cache"
end

def cache_instagram(id, media, cache)
  cache_file = get_instagram_cache_file id, cache
  media = media.to_json
  File.open(cache_file, "w") do |io|
    io.write media
  end
  JSON.parse(media)
end

def get_instagram_cache(id, cache)
  cache_file = get_instagram_cache_file id, cache
  JSON.parse(File.read(cache_file)) if File.exists? cache_file
end

# :overwrite is passed to directly to `new_instagram`
# :min_id and :max_id can be set to retrieve a range of instagrams
# if both are nil, default is getting everything newer than the latest cache (all if there's no cache)
desc "Run `rake new_instagram` for all instagrams newer than the most recent one in the cache"
task :recent_instagrams, :overwrite, :min_id, :max_id, :recursive do |t, args|
  instagram = ready_instagram instagram_access, instagram_cache
  instagram_request, min_default = {"count" => 60}, "beginning"
  args.with_defaults(:min_id => min_default)
  min_id = args.min_id

  # Get and order the cache by most recent, descending
  ordered_cache = `ls #{instagram_cache}`.split("\n").sort { |x, y|
    x = Integer(x.split("_")[0])
    y = Integer(y.split("_")[0])
    y <=> x
  }

  # Set min_id to the most recent cached id, if a min_id wasn't explicity passed in
  min_id = ordered_cache.first.split(".")[0] if args.min_id == min_default && ordered_cache.length > 0 && !args.recursive

  instagram_request["min_id"] = min_id unless min_id == min_default
  instagram_request["max_id"] = args.max_id if args.max_id

  # Get instagrams and create a new post for each, while storing each media id
  media_ids = instagram.user_recent_media(instagram_request).map { |media|
    media_id = media["id"]
    unless media_id == min_id
      Rake::Task["new_instagram"].reenable
      Rake::Task["new_instagram"].invoke(media, args.overwrite)
    end
    media_id
  }

  # If we didn't reach our min_id yet, we need to abort this task and paginate
  if media_ids.last && media_ids.last != min_id
    Rake::Task[t].reenable
    Rake::Task[t].invoke(args.overwrite, min_id, media_ids.last, true)
  end
end

# overwrite will decide if new_instagram will overwrite or skip writing to a file
# (o)verwrite will overwrite; (s)kip will skip; (p)rompt will prompt for each file
# default is skip
desc "Create a new instagram post in #{posts_dir}"
task :new_instagram, :id, :overwrite do |t, args|
  mkdir_p "#{posts_dir}", {:verbose => false}
  args.with_defaults(:overwrite => "skip")

  raise "### You need to specify an instagram id or media hash" unless args.id
  media = nil

  # If we passed in a hash, use it and cache it
  if args.id.is_a?(Hashie::Mash)
    media = args.id
    media_id = media["id"]
    cache_instagram media_id, media, instagram_cache
  else
    media_id = args.id
  end

  # If we have no media yet, try to retrieve it from the cache
  # If there's nothing in the cache, request from instagram and cache it
  unless media
    media_cache = get_instagram_cache media_id, instagram_cache
    if media_cache
      media = media_cache
    else
      instagram = ready_instagram instagram_access, instagram_cache
      media = cache_instagram media_id, instagram.media_item(media_id), instagram_cache
    end
  end

  # Prep data
  time, caption, tags, filter = Time.at(Integer(media["created_time"])), media["caption"], media["tags"], media["filter"]
  tags = tags.join("\", \"")
  tags = "\"#{tags.downcase}\"" if tags != ""
  categories = "\"#{filter}\""
  title = caption ? media["caption"]["text"] : "Untitled Instagram"
  file_id = caption ? "" : "-#{media_id.split("_")[0]}"
  post_title = title.gsub(/[#,@]/,"").to_url
  post_uri = "#{post_title}#{file_id}"
  filename = "#{posts_dir}/#{time.strftime("%Y-%m-%d")}-#{post_uri}.#{new_post_ext}"

  # Test if we should write post to file or not
  write_file = true
  if File.exist?(filename)
    if args.overwrite == "prompt" || args.overwrite == "p"
      write_file = ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n' ? false : true
    elsif args.overwrite == "overwrite" || args.overwrite == "o"
      write_file = true
    elsif args.overwrite == "skip" || args.overwrite == "s"
      write_file = false
    end
  end

  if write_file
    puts "Writing post: #{filename}"
    open(filename, 'w') do |post|
      post.puts "---"
      post.puts "layout: post"
      post.puts "title: \"#{title.gsub(/&/,'&amp;').gsub(/\"/, '\"')}\""
      post.puts "date: #{time.strftime('%Y-%m-%d %H:%M:%S')}"
      post.puts "comments: false"
      post.puts "categories: [#{categories}]"
      post.puts "tags: [#{tags}]"
      post.puts "---"
      post.puts ""
      post.puts "{% instagram #{media_id} #{post_uri} %}"
    end
  else
    puts "Skipping post: #{filename}"
  end
end