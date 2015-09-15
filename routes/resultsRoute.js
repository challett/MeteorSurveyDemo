/**
 * Created by Connor on 9/15/2015.
 */

ResultRoutesController = RouteController.extend({
    template: 'results',
    data: function() {
        return {
        };
    },
    before: function () {
        this.next();
    }
});

Router.route('/results', {
    name: 'results',
    controller: ResultRoutesController,
    yieldTemplates: {
    }
});