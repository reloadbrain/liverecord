/**
 * Created by zoonman on 11/27/16.
 */
app.factory('CategoriesFactory', ['$q', 'socket', function ($q, socket) {

    var service = {
        categories: [],
        load: function () {
            var deferred = $q.defer();
            if (service.categories.length == 0) {
                socket.emit('categories', {}, function(data) {
                    service.categories = data;console.log(data);
                    deferred.resolve(service.categories);
                });
            } else {
                deferred.resolve(service.categories);
            }
            return deferred.promise;
        },
        active: function (slug) {
            if (slug) {
                service.categories.forEach(function(category) {
                    category.active = (category.slug && category.slug === slug);
                });
                console.log('actve cat', service.categories);
                return service.categories;
            } else {
                //
                var activeCategory = null;
                service.categories.forEach(function(category) {
                    if (category.active) {
                        return activeCategory = category;
                    }
                });
                return activeCategory;
            }
        },
        get: function() {
            return service.categories;
        }

    };

    return service;
}]);
