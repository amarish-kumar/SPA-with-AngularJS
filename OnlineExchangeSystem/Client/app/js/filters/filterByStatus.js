'use strict';

onlineExchange.filter('status', function () {
    return function (input) {
        switch (input) {
            case 'inactive':
                return "Inactive";
                break;
            case 'WaitingApproval':
                console.log('ok');
                break;
            case 'published':
                return "Published";
                break;
            case 'rejected':
                return "Rejected";
                break;
        }
    }
});
