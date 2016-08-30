/**
 * Created by Connor on 9/14/2015.
 */
Meteor.startup(function () {
    Meteor.disconnect();
    Questions = new Ground.Collection('questions', { connection: null });
    Answers = new Ground.Collection('answers', { connection: null });
    Categories = new Ground.Collection('categories', { connection: null });
});
