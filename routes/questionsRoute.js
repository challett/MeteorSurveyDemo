/**
 * Created by Connor on 9/15/2015.
 */

ContentsRoutesController = RouteController.extend({
    template: 'questions',
    data: function() {
        return {
        };
    },
    before: function () {
        this.next();
    }
});

Router.route('/questions', {
    name: 'questions',
    controller: ContentsRoutesController,
    yieldTemplates: {
    }
});