// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


var apiToken = $('#api-token').val();
$.ajaxSetup({
    headers: {
        "token": apiToken
    }
});

var Visit = Backbone.Model.extend({});
var VisitCollection = Backbone.Collection.extend({
    model: Visit,
    url: '/api/visits'
});

var VisitView = Backbone.View.extend({
    tagName: 'li',
    className: 'visit',
    template: _.template( $('#visit-view').html() ),
    render: function() {
        this.$el.empty();
        var html = this.template( this.model.toJSON() );
        var $html = $(html);
        this.$el.append($html);
    },
    events:{
        'click button.remove': 'removeVisit'
    },
    removeVisit: function(){
        this.$el.remove();
        this.model.destroy();

    }
});

var VisitListView = Backbone.View.extend({
    initialize: function(){
        this.listenTo(this.collection, 'add', this.render);
        this.listenTo(this.collection, 'add', this.renderPoints);
    },
    render: function(){
        this.$el.empty();
        var visits = this.collection.models;
        var view;
        for (var i = 0; i < visits.length; i++) {
            view = new VisitView({model: visits[i]});
            view.render();
            this.$el.append( view.$el );
        }
    }
});

var allTheVisits = new VisitCollection();
var visitsPainter = new VisitListView({
    collection: allTheVisits,
    el: $('.visits')
});
allTheVisits.fetch();

    $('form.new-visit').on('submit', function(e){
        e.preventDefault();
        var newReview = $(this).find('input[name="visit[review]"]').val();
        allTheVisits.create({review: newReview});
    });
