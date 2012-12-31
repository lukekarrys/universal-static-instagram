# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron


set :output, "/home/lkarrys/www/instagram.lukelov.es/logs/cron.log"


every 1.minutes do
  rake "recent_instagrams"
  command "jekyll"
  command "sh deploy.sh"
end

# Learn more: http://github.com/javan/whenever
