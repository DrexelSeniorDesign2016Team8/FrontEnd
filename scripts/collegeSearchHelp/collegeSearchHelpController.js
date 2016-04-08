/**
 * Ian Shinbrot
 */
app.controller('collegeSearchHelpController', function($scope) {
        var imagePath = 'img/list/60.jpeg';

    $scope.pageTitle="CollegeSearch Help"
        $scope.phones = [
            {
                type: 'Home',
                number: '(555) 251-1234',
                options: {
                    icon: 'communication:phone'
                }
            },
            {
                type: 'Cell',
                number: '(555) 786-9841',
                options: {
                    icon: 'communication:phone',
                    avatarIcon: true
                }
            },
            {
                type: 'Office',
                number: '(555) 314-1592',
                options: {
                    face : imagePath
                }
            },
            {
                type: 'Offset',
                number: '(555) 192-2010',
                options: {
                    offset: true,
                    actionIcon: 'communication:phone'
                }
            }
        ];
        $scope.todos = [
            {
                face : imagePath,
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face : imagePath,
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face : imagePath,
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face : imagePath,
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face : imagePath,
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
        ];
    });


/**
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that can be in foundin the LICENSE file at http://material.angularjs.org/license.
 **/