# Based on a plugin by Jose Diaz-Gonzalez
# https://github.com/josegonzalez/josediazgonzalez.com/tree/master/_plugins
# and
# https://github.com/belkadan/jekyll-shadowbox/blob/master/_plugins/archive.rb
 
module Jekyll
 
  class ArchiveIndex < Page    
    def initialize(site, base, dir, collated_posts)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'
 
      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'date_archive.html')
 
      _, year, month, day = dir.split('/')

      self.data['title'] = 'Archive for '
      if month
        self.data['title'] << Date::MONTHNAMES[month.to_i] << ' '
        if day
          self.data['title'] << day << ', '
        end
      end
      self.data['title'] << year

      self.data['posts'] = []
      if day
        self.data['posts'] += collated_posts[year.to_i][month.to_i][day.to_i]
      elsif month
        collated_posts[year.to_i][month.to_i].sort {|a,b| b <=> a}.each do |entry|
          self.data['posts'] += entry[1]
        end
      else
        collated_posts[year.to_i].sort {|a,b| b <=> a}.each do |entry|
          entry[1].sort {|a,b| b <=> a}.each do |post|
            self.data['posts'] += post[1]
          end
        end
      end

    end
  end

  class ArchiveGenerator < Generator
    safe true
 
    def generate(site)
      collated_posts = collate(site)
      collated_posts.each do |y, months|
        site.pages << ArchiveIndex.new(site, site.source, "/%04d" % [ y.to_s ], collated_posts)
        months.each do |m, days|
          site.pages << ArchiveIndex.new(site, site.source, "/%04d/%02d" % [ y.to_s, m.to_s ], collated_posts)
          days.each_key do |d|
            site.pages << ArchiveIndex.new(site, site.source, "/%04d/%02d/%02d" % [ y.to_s, m.to_s, d.to_s ], collated_posts)
          end
        end
      end
    end
 
    def collate(site)
      collated_posts = Hash.new do |year_hash, year|
        year_hash[year] = Hash.new do |month_hash, month| 
          month_hash[month] = Hash.new do |day_hash, day| 
            day_hash[day] = []
          end
        end
      end
      site.posts.reverse.each do |post|
        y, m, d = post.date.year, post.date.month, post.date.day
        collated_posts[ y ][ m ][ d ] << post unless collated_posts[ y ][ m ][ d ].include?(post)
      end
      collated_posts
    end
  end

end