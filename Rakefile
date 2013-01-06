require "highline/import"
require "stringex"
require "instagram"
require "hashie"
require "json"
require "yaml"
require "httpclient"
require "clipboard"
require "htmlentities"

new_post_ext    = "markdown"  # default new post file extension when using the new_post task
posts_dir       = "source/_posts"    # directory for blog files

opts = YAML.load_file('_config.yml').merge(YAML.load_file('_secret.yml'))
instagram_access = '.instagram/access_token'
instagram_cache = '.instagram/cache/'

def ready_instagram(access, cache)
  mkdir_p cache, {:verbose => false}
  Instagram.client(:access_token => File.open(access).gets)
end

def configure_instagram(client, secret)
  Instagram.configure do |config|
    config.client_id = client
    config.client_secret = secret
  end
end

def authorize_url(redirect_uri)
  Instagram.authorize_url(:redirect_uri => redirect_uri)
end

def get_access_token(code, redirect_uri, instagram_access)
  response = Instagram.get_access_token(code, :redirect_uri => redirect_uri)
  if File.exist?(instagram_access)
    File.truncate(instagram_access, 0)
  end
  open(instagram_access, 'w') do |file|
    file.puts response.access_token
  end
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

desc "Create and save an Instagram access token"
task :access_token do |t, args|
  configure_instagram(opts["instagram_client_id"], opts["instagram_secret"])
  auth_url = authorize_url(opts["instagram_redirect_uri"])
  Clipboard.copy auth_url
  code = ask("Go to #{auth_url} in your browser. Authenticate and then enter the code query param from the redirect: ")
  get_access_token(code, opts["instagram_redirect_uri"], instagram_access)
  puts "### Access code has been saved to #{instagram_access}"
end

task :subscription do |t, args|
  instagram = ready_instagram instagram_access, instagram_cache
  instagram.create_subsription(:object => "user", :aspect => "media", :callback_url => "#{opts["instagram_redirect_uri"]}/proxy/instagram-realtime.php")
end

desc "Deploy"
task :deploy do |t, args|
  puts "## Deploying website via Rsync"
  system("rsync #{opts["rsync_opts"]}")
end

desc "Generate and deploy"
task :gen_deploy do |t, args|
  system("jekyll")
  Rake::Task["deploy"].invoke()
end

desc "Get recent_instagram and generate and deploy"
task :all do |t, args|
  Rake::Task["recent_instagrams"].invoke()
  Rake::Task["gen_deploy"].invoke()
  puts "Finished at: #{Time.now.inspect}"
end

# :overwrite is passed to directly to `new_instagram`
# :delete_cache of 'y' or 'yes' will delete *ALL* cache and posts first
# :min_id and :max_id can be set to retrieve a range of instagrams
# if both are nil, default is getting everything newer than the latest cache (all if there's no cache)
desc "Run `rake new_instagram` for all instagrams newer than the most recent one in the cache"
task :recent_instagrams, :overwrite, :delete_cache, :min_id, :max_id, :recursive do |t, args|
  instagram = ready_instagram instagram_access, instagram_cache
  instagram_request, min_default = {"count" => 60}, "beginning"
  args.with_defaults(:min_id => min_default)
  min_id = args.min_id

  if args.delete_cache == "yes" || args.delete_cache == "y"
    puts "Deteting #{instagram_cache}"
    `rm -rf #{instagram_cache}`
    mkdir_p instagram_cache
    `rm -rf #{posts_dir}`
    mkdir_p posts_dir
  end

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
    Rake::Task[t].invoke(args.overwrite, "no", min_id, media_ids.last, true)
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
  file_id = media_id.split("_")[0]
  hasCaption = (caption && caption["text"] && Integer(Integer(media["created_time"]) - Integer(caption["created_time"])).abs < opts["max_caption_created_diff"]) 
  title = hasCaption ? media["caption"]["text"] : "Untied Instagram"
  post_uri = hasCaption ? title.gsub("#", "hashtag-").to_url : (title + '-' + file_id).to_url
  post_uri = "United Instagram #{file_id}".to_url if post_uri == ""
  filename = "#{posts_dir}/#{time.strftime("%Y-%m-%d")}-#{post_uri}.#{new_post_ext}"
  title = HTMLEntities.new.encode title

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
      post.puts "title: \"#{title}\""
      post.puts "date: #{time.strftime('%Y-%m-%d %H:%M:%S')}"
      post.puts "categories: [#{categories}]"
      post.puts "tags: [#{tags}]"
      post.puts "---"
      post.puts ""
      post.puts "{% instagram #{media_id} \"#{title}\" %}"
    end
  else
    puts "Skipping post: #{filename}"
  end
end