/**
 * Created by Connor on 9/15/2015.
 */
Template.contents.events({
    'click .see-questions': function (e) {
        e.stopImmediatePropagation();
        Router.go('/questions', {}, {replaceState: true});
    }
});