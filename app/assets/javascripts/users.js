// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


var apiToken = $('#api-token').val();
$.ajaxSetup({
    headers: {
        "token": apiToken
    }
});

var Comment = Backbone.Model.extend({});
var CommentCollection = Backbone.Collection.extend({
    model: Comment,
    url: '/api/comments'
});

var CommentView = Backbone.View.extend({
    tagName: 'li',
    className: 'comment',
    template: _.template( $('#comment-view').html() ),
    render: function() {
        this.$el.empty();
        var html = this.template( this.model.toJSON() );
        var $html = $(html);
        this.$el.append($html);
    },
    events:{
        'click button.remove': 'removeComment'
    },
    removeComment: function(){
        this.$el.remove();
        this.model.destroy();

    }
});

var CommentListView = Backbone.View.extend({
    initialize: function(){
        this.listenTo(this.collection, 'add', this.render);
        this.listenTo(this.collection, 'add', this.renderPoints);
    },
    render: function(){
        this.$el.empty();
        var comments = this.collection.models;
        var view;
        for (var i = 0; i < comments.length; i++) {
            view = new CommentView({model: comments[i]});
            view.render();
            this.$el.append( view.$el );
        }
    }
});

var allTheComments = new CommentCollection();
var commentsPainter = new CommentListView({
    collection: allTheComments,
    el: $('.comments')
});
allTheComments.fetch();

    $('form.new-comment').on('submit', function(e){
        e.preventDefault();
        var newName = $(this).find('input[name="comment[name]"]').val();
        var newText = $(this).find('input[name="comment[text]"]').val();
        allTheComments.create({text: newText, name: newName});
    });
