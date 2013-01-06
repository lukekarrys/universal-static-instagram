/*global jQuery _ escape document unescape window */

var cookie = {
  setCookie : function(name, value, days, path, domain, secure){
    var c = name + '=' + escape(value);
    var expires = null;
    if (days)
      expires = new Date(new Date().getTime() + (days * 24 * 60 * 60 * 1000));
    if (expires)
      c += '; expires=' + expires.toUTCString();
    if (path)
      c += '; path=' + path;
    if (domain)
      c += '; domain=' + domain;
    if (secure)
      c += '; secure';
    document.cookie = c;
  },
  getCookie : function(name){
    var pattern = new RegExp('(^|; )' + name + '=([^;]*)');
    var m = document.cookie.match(pattern);
    return m && unescape(m[2]);
  }
};

function parseUri (str) {
  var o   = {
  strictMode: false,
  key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
  q:   {
    name:   "queryKey",
    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
  },
  parser: {
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
},
    m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
    uri = {},
    i   = 14;

  while (i--) uri[o.key[i]] = m[i] || "";

  uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2;
  });

  return uri;
}


(function($) {

  var instagram = {
    apiBase: 'https://api.instagram.com/v1/',
    cookieKey: 'instagramAccessToken',
    usernameCookie: 'instaUsername',
    lastPageCookie: 'lastPage',
    userProfile: 'http://instagram.com/',
    username: '',
    getUsername: function() {
      return this.username || cookie.getCookie(this.usernameCookie) || '';
    },
    accessToken: function() {
      return parseUri(window.location.href).anchor.split('access_token=')[1] || cookie.getCookie(this.cookieKey) || '';
    },
    userlink: function(usernamePath) {
      return "<a href=\""+this.userProfile+"<%= "+usernamePath+" %>\"><%= "+usernamePath+" %></a>";
    },
    likes: function(count) {
      var content = (count === 0) ? "No likes" : "<% _.each(data, function(item) { %>"+this.userlink('item.username')+" | <% }); %>";
      return "<h3><span class='like-count'>"+count+"</span> Likes | <a href='#' id='like-this'>♥</a></h3><p class='like-holder'>"+content+"</p>";
    },
    likesHelper: function(str) {
      return str.replace(' | </p>', '</p>');
    },
    individualComment: function(currentUsername) {
      return "<li id='<%= item.id %>' data-from-user='<%= item.from.username %>'><span class='userlink'>"+this.userlink('item.from.username')+"<% if (item.from.username === '"+currentUsername+"') { %> | <a href='#' data-comment-id='<%= item.id %>' class='delete-comment'>x</a><% } %></span><%= item.text %></li>";
    },
    comments: function(count) {
      var content = (count === 0) ? "<li class='no-comments'>No comments</li>" : "<% _.each(data, function(item) { %>"+this.individualComment(this.getUsername())+"<% }); %>";
      return "<h3>Comments</h3><ul class='comment-holder'>"+content+"<li><form id='comment-form'><textarea></textarea><input class='submit' type='submit' value='Submit' /></form></li></ul>";
    },
    commentsHelper: function(str) {
      return str.replace(/(^|\W)@(\w+)/g, '$1<a href="'+this.userProfile+'$2">@$2</a>')
                .replace(/([^"'])(https?:\/\/)([\w\-:;?&=+.%#\/]+)/gi, '$1<a href="$2$3">$3</a>');
    },
    init: function() {

      var accessToken = this.accessToken(),
          $commentLink = $('.instagram-comment-link'),
          mediaId = $commentLink.attr('id'),
          _this = this,
          jsonpQS = '?access_token=' + accessToken,
          saveUsername = function(resp) {
            if (resp.meta.code === 200) {
              cookie.setCookie(_this.usernameCookie, resp.data.username, 365, '/');
              _this.username = resp.data.username;
              _this.initLikes(mediaId, jsonpQS, accessToken);
              _this.initComments(mediaId, jsonpQS, accessToken);
            }
          },
          currentUsername = _this.getUsername();

      cookie.setCookie(this.cookieKey, accessToken, 365, '/');

      if (_.without(_.compact(window.location.pathname.split("/")), "index.html").length > 0) cookie.setCookie(_this.lastPageCookie, window.location.pathname, 1, '/');

      if (parseUri(window.location.href).anchor.split('access_token=')[1] && !mediaId) {
        var lastPage = cookie.getCookie(_this.lastPageCookie);
        if (lastPage && lastPage !== "null" && (lastPage.indexOf('http') === 0 || lastPage.charAt(0) === '/')) {
          window.location.href = lastPage;
        }
      } else if (accessToken && mediaId) {
        cookie.setCookie(this.cookieKey, accessToken, 365, '/');

        // If we already have a username then proceed with getting the comments/likes
        // otherwise do an ajax request to get it
        if (currentUsername) {
          saveUsername({
            meta: {
              code: 200
            },
            data: {
              username: currentUsername
            }
          });
        } else {
          // Save username
          $.ajax({
            url: this.apiBase + 'users/self' + jsonpQS,
            dataType: 'jsonp',
            type: 'GET',
            error: _this.handleError,
            success: saveUsername
          });
        }
      }
    },
    initComments: function(mediaId, jsonpQS, accessToken) {

      var _this = this;

      $.ajax({
        url: this.apiBase + 'media/' + mediaId + '/comments' + jsonpQS,
        dataType: 'jsonp',
        type: 'GET',
        error: function(err) {},
        success: function(resp) {
          resp.data.currentUsername = _this.getUsername();
          var template = _this.commentsHelper(_.template(_this.comments(resp.data.length), resp));
          $('.instagram-comment-link').remove();
          $('.instagram-comment-holder').append(template);

          $('.comment-holder').on('click', '.delete-comment', function(e) {
            e.preventDefault();
            var commentId = $(this).attr('data-comment-id');
            $.ajax({
              url: '/proxy/instagram.php',
              dataType: 'json',
              type: 'POST',
              data: {access_token: accessToken, id: mediaId, endpoint: 'comments', _method: 'DELETE', comment_id: commentId},
              error: _this.handleError,
              success: function(resp) {
                $('#'+commentId).remove();
              }
            });
          });

          $('#comment-form .submit').click(function(e) {
            e.preventDefault();

            var text = $('#comment-form textarea').val(),
                noComments = $('.no-comments');

            if (text) {
              $.ajax({
                url: '/proxy/instagram.php',
                dataType: 'json',
                type: 'POST',
                data: {access_token: accessToken, id: mediaId, endpoint: 'comments', text: text},
                error: _this.handleError,
                success: function(resp) {
                  if (resp.meta.code === 200) {
                    var commentData = {
                      item: {
                        text: _this.commentsHelper(resp.data.text),
                        from: resp.data.from,
                        id: resp.data.id
                      }
                    };
                    $('.comment-holder li').last().before(_.template(_this.individualComment(_this.getUsername()), commentData));
                    $('#comment-form textarea').val('');
                    if (noComments.length > 0) noComments.remove();
                  }
                }
              });
            }
          });
        }
      });

    },
    initLikes: function(mediaId, jsonpQS, accessToken) {

      var _this = this;

      // Get likes and then bind click to like/unlike
      $.ajax({
        url: this.apiBase + 'media/' + mediaId + '/likes' + jsonpQS,
        dataType: 'jsonp',
        type: 'GET',
        error: _this.handleError,
        success: function(resp) {

          var likes = _.pluck(resp.data, 'username'),
              isLiked = (_.indexOf(likes, _this.username) > -1),
              likeClass = (isLiked) ? 'liked' : 'unliked',
              template = _this.likesHelper(_.template(_this.likes(resp.data.length), resp));

          $('.instagram-comment-link').remove();
          $('.instagram-comment-holder').append(template);

          $('#like-this').addClass(likeClass).click(function(e) {

            e.preventDefault();

            var isCurrentlyLiked = $('#like-this').hasClass('liked'),
                $likeCount = $('.like-count'),
                currentLikeCount = parseInt($likeCount.html(), 10),
                method, success,
                successPrep = function(resp, cb) {
                  if (resp.meta.code === 200) {
                    var curHtml = $('.like-holder').html(),
                        savedUsername = _this.username,
                        usernameLink = _.template(_this.userlink('username'), {username: savedUsername});
                    cb(curHtml, usernameLink);
                  }
                };

            if (!isCurrentlyLiked) {
              method = 'POST';
              success = function(curHtml, usernameLink) {
                var divider = ' | ';
                if (currentLikeCount === 0) {
                  curHtml = '';
                  divider = '';
                }
                $('.like-holder').html(usernameLink + divider + curHtml);
                $('#like-this').addClass('liked').removeClass('unliked');
                $likeCount.html(++currentLikeCount);
              };
            } else {
              method = 'DELETE';
              success = function(curHtml, usernameLink) {
                var divider = ' | ',
                    replaceWith = '';
                if (currentLikeCount === 1) {
                  divider = '';
                  replaceWith = 'No likes';
                }
                $('.like-holder').html(curHtml.replace(usernameLink + divider, replaceWith));
                $('#like-this').removeClass('liked').addClass('unliked');
                $likeCount.html(--currentLikeCount);
              };
            }

            $.ajax({
              url: '/proxy/instagram.php',
              dataType: 'json',
              type: 'POST',
              data: {access_token: accessToken, id: mediaId, endpoint: 'likes', _method: method},
              error: _this.handleError,
              success: function(resp) {
                successPrep(resp, success);
              }
            });

          });
        }
      });

    },
    handleError: function(err) {
      // Error
    }
  };

  $(function() {
    instagram.init();
  });

})(jQuery);
