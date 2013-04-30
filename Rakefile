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
  code = ask("Go to #{auth_url} in your browser (the url has ben copied to your clipboard). Authenticate and then enter the code query param from the redirect: ")
  get_access_token(code, opts["instagram_redirect_uri"], instagram_access)
  puts "### Access code has been saved to #{instagram_access}"
end

desc "Generate"
task :generate do |t, args|
  system("jekyll")
end

public_dir = "public"
deploy_dir = "_deploy"
deploy_branch  = "gh-pages"

def get_stdin(message)
  print message
  STDIN.gets.chomp
end

desc "deploy public directory to github pages"
multitask :push do
  puts "## Deploying branch to Github Pages "
  (Dir["#{deploy_dir}/*"]).each { |f| rm_rf(f) }
  puts "\n## copying #{public_dir} to #{deploy_dir}"
  cp_r "#{public_dir}/.", deploy_dir
  cd "#{deploy_dir}" do
    system "git add ."
    system "git add -u"
    puts "\n## Commiting: Site updated at #{Time.now.utc}"
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m \"#{message}\""
    puts "\n## Pushing generated #{deploy_dir} website"
    system "git push origin gh-pages --force"
    puts "\n## Github Pages deploy complete"
  end
end

desc "Set up _deploy folder and deploy branch for Github Pages deployment"
task :setup_github_pages, :repo do |t, args|
  if args.repo
    repo_url = args.repo
  else
    puts "Enter the read/write url for your repository"
    puts "(For example, 'git@github.com:your_username/your_username.github.io)"
    repo_url = get_stdin("Repository url: ")
  end
  user = repo_url.match(/:([^\/]+)/)[1]
  branch = (repo_url.match(/\/[\w-]+\.github\.(?:io|com)/).nil?) ? 'gh-pages' : 'master'
  project = (branch == 'gh-pages') ? repo_url.match(/\/([^\.]+)/)[1] : ''
  unless (`git remote -v` =~ /origin.+?octopress(?:\.git)?/).nil?
    # If octopress is still the origin remote (from cloning) rename it to octopress
    system "git remote rename origin octopress"
    if branch == 'master'
      # If this is a user/organization pages repository, add the correct origin remote
      # and checkout the source branch for committing changes to the blog source.
      system "git remote add origin #{repo_url}"
      puts "Added remote #{repo_url} as origin"
      system "git config branch.master.remote origin"
      puts "Set origin as default remote"
      system "git branch -m master source"
      puts "Master branch renamed to 'source' for committing your blog source files"
    end
  end
  url = "http://#{user}.github.io"
  url += "/#{project}" unless project == ''
  jekyll_config = IO.read('_config.yml')
  jekyll_config.sub!(/^url:.*$/, "url: #{url}")
  File.open('_config.yml', 'w') do |f|
    f.write jekyll_config
  end
  rm_rf deploy_dir
  mkdir deploy_dir
  cd "#{deploy_dir}" do
    system "git init"
    system "echo 'My Octopress Page is coming soon &hellip;' > index.html"
    system "git add ."
    system "git commit -m \"Octopress init\""
    system "git branch -m gh-pages" unless branch == 'master'
    system "git remote add origin #{repo_url}"
    rakefile = IO.read(__FILE__)
    rakefile.sub!(/deploy_branch(\s*)=(\s*)(["'])[\w-]*["']/, "deploy_branch\\1=\\2\\3#{branch}\\3")
    rakefile.sub!(/deploy_default(\s*)=(\s*)(["'])[\w-]*["']/, "deploy_default\\1=\\2\\3push\\3")
    File.open(__FILE__, 'w') do |f|
      f.write rakefile
    end
  end
  puts "\n---\n## Now you can deploy to #{url} with `rake deploy` ##"
end

desc "Get recent_instagrams and if there are updates, then generate and deploy"
task :all, :overwrite, :cache do |t, args|
  args.with_defaults(:overwrite => 'skip', :cache => 'nothing')
  Rake::Task["recent_instagrams"].invoke(args.overwrite, args.cache, 'gen_deploy')
  puts "Finished at: #{Time.now.inspect}"
end

# :overwrite is passed to directly to `new_instagram`
# :cache of 'delete' will delete *ALL* cache and posts first
# :cache of 'use' will only write posts that are in the cache
# :after is a rake task that will be called after
# :min_id and :max_id can be set to retrieve a range of instagrams
# if both are nil, default is getting everything newer than the latest cache (all if there's no cache)
desc "Run `rake new_instagram` for all instagrams newer than the most recent one in the cache"
task :recent_instagrams, :overwrite, :cache, :after, :min_id, :max_id, :recursive do |t, args|
  instagram = ready_instagram instagram_access, instagram_cache
  instagram_request, min_default = {"count" => 60}, "beginning"
  args.with_defaults(:min_id => min_default)
  min_id = args.min_id

  if args.cache == "delete" && args.recursive != true
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

  if args.cache == "use"
    media_ids = ordered_cache.map { |cache|
      media = get_instagram_cache cache.split('.')[0], instagram_cache
      Rake::Task["new_instagram"].reenable
      Rake::Task["new_instagram"].invoke(media, args.overwrite)
      media["id"]
    }
  else
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
      Rake::Task[t].invoke(args.overwrite, args.cache, args.after, min_id, media_ids.last, true)
    end
  end

  if args.after && (args.recursive == true || media_ids.length > 1)
    Rake::Task[args.after].reenable
    Rake::Task[args.after].invoke()
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
  if args.id.is_a?(Hashie::Mash) || args.id.is_a?(Hash)
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
  title = hasCaption ? media["caption"]["text"] : "Untitled Instagram"
  post_uri = hasCaption ? title.gsub("#", "hashtag-").to_url : (title + '-' + file_id).to_url
  post_uri = "Untitled Instagram #{file_id}".to_url if post_uri == ""
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
      post.puts "media_id: \"#{media_id}\""
      post.puts "---"
      post.puts ""
      post.puts "{% instagram %}"
    end
  else
    puts "Skipping post: #{filename}"
  end
end