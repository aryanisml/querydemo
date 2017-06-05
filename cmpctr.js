angular.module('myapp')
    .controller('cmpctr', function ($scope) {


        //$('#builder').queryBuilder({
        angular.element('#builder').queryBuilder({
            allow_groups: true,
            conditions: ['AND'],
            plugins: [
                'sortable'
            ],

            filters: [
                {
                    id: 'continent',
                    label: 'Continent',
                    type: 'string',
                    input: 'select',
                    //optgroup: 'core',
                    //placeholder: 'Select something',

                    values: {
                        'eur': 'Europe',
                        'asia': 'Asia',
                        'oce': 'Oceania',
                        'afr': 'Africa',
                        'na': 'North America',
                        'sa': 'South America'
                    },

                    //valueSetter : filterContValSetter,

                    operators: ['equal', 'not_equal', 'is_null', 'is_not_null', 'between']
                },

                //   {
                //     id: 'age',
                //     label: 'Age',
                //     type: 'integer',
                //     input: 'text',
                //     value_separator: '|',
                //     //optgroup: 'core',
                //     description: function(rule) {
                //       if (rule.operator && ['in', 'not_in'].indexOf(rule.operator.type) !== -1) {
                //         return 'Use a pipe (|) to separate multiple values with "in" and "not in" operators';
                //       }
                //     }
                //   }      
            ]

        });

        var qbFilters = [];

        function procValueSetter(rule, value) {
            alert("inside procValueSetter !!");
            console.log("inside procValueSetter !! ");

            alert(rule.id);

            var $container = rule.$el.find('.rule-value-container');
            var $target = $container.find('select');
            $target.append('<option value=1>TA2_NEW_1</option>');
            $target.append('<option value=1>TA2_NEW_2</option>');

        }
        function procValueParser(rule, value) {
            //   alert(1221);

        }


        /*
        function filterContValSetter(rule, value){
             alert(" inside filterContValSetter !!");
             console.log(" inside filterContValSetter !!");
             
             var $container = rule.$el.find('.rule-value-container');
             var $target = $container.find('select');
             $target.append('<option value=1>Cont_1</option>');
             $target.append('<option value=1>Cont_2</option>');
        }
        */

        function getCriFilterType(id) {
            //alert(" inside getCriFilterType !!");
            var filterType = "";

            if (id == 'ta') {
                filterType = 'string';
            }
            else if (id == 'indication') {
                filterType = 'string';

            }
            else if (id == 'phase') {
                filterType = 'string';

            }
            else if (id == 'ta2') {
                filterType = 'string';

            }

            return filterType;
        }

        function getCriFilterInput(id) {
            //alert(" inside getCriFilterInput !!");
            var filterInput = "";

            if (id == 'ta') {
                filterInput = 'select';
            }
            else if (id == 'indication') {
                filterInput = 'select';
            }
            else if (id == 'phase') {
                filterInput = 'select';
            }
            else if (id == 'ta2') {
                filterInput = 'select';
            }

            return filterInput;
        }


        function getCriFilterValues(id) {
            //alert(" inside getCriFilterValues !!");
            var filterValues = [];

            if (id == 'ta') {
                filterValues = {
                    't1': 'T1',
                    't2': 'T2',
                    't3': 'T3'
                }
            }
            else if (id == 'indication') {
                filterValues = {
                    'ind1': 'Ind1',
                    'ind2': 'Ind2',
                    'ind3': 'Ind3'
                }
            }
            else if (id == 'phase') {
                filterValues = {
                    'phase1': 'Phase1',
                    'phase2': 'Phase2',
                    'phase3': 'Phase3'
                }
            }
            else if (id == 'ta2') {
                filterValues = {
                    'ta2_phase1': 'ta2_Phase1',
                    'ta2_phase2': 'ta2_Phase2',
                    'ta2_phase3': 'ta2_Phase3'
                }
            }

            return filterValues;
        }


        $scope.$on('addCriteria', function (event, data) {
            //cretate a filter for add criteria
            var criFilter = {};
            try {
                //set filter parameters
                criFilter.id = data.filterId;
                criFilter.label = data.filterId;
                criFilter.type = getCriFilterType(data.filterId);

                criFilter.input = getCriFilterInput(data.filterId);

                //criFilter.Placeholder = getCriFilterPlaceholder(data.filterId);
                //criFilter.Placeholder = 'Select something';

                criFilter.values = getCriFilterValues(data.filterId);
                //criFilter.operators = getCriFilterOperators(data.filterId);

                // criFilter.valueSetter = procValueSetter;  
                // criFilter.valueParser=procValueParser;

                console.log(qbFilters);
                angular.element('#builder').queryBuilder('addFilter', criFilter);
            }
            catch (err) {
                console.log("Error adding new Criteria Filter - " + err.message);
            }
            finally {
                //create a new rule based on the new filter
                console.log("Creating new rule for filter - " + criFilter);
                var builderModel = angular.element('#builder').data('queryBuilder').model;
                var newRule = angular.element('#builder').queryBuilder("addRule", builderModel.root);
                newRule.filter = angular.element('#builder').queryBuilder("getFilterById", criFilter.id);

                //newRule.operator = $builder.queryBuilder("getOperatorByType", "equal");   

                //maintain an array of filters 
                //qbFilters.push(criFilter);
            }

        }); //of event handler


        //function to get query string
        $scope.getQuery = function () {
            var result = angular.element('#builder').queryBuilder('getRules');
            $scope.outQuery = JSON.stringify(result);
        };


        angular.element('#builder').on('afterAddRule.queryBuilder', function (e, rule) {

            //alert("afterAddRule event triggered !");
            rule.data = { ruleId: rule.id, grpId: rule.parent.id, reload: true };


            //console.log(JSON.stringify(rule.data));

            //rule.flags = {filter_readonly : true};

            var queryBuilderElt = e.builder.$el;

            var ruleElt = rule.$el;


        });





        function sendRuleValueChangeEvent(qbJsonStr, data) {
            //alert("rule Id =" + data.ruleId );
            //alert("parent group Id =" + data.grpId );    


        }


        angular.element('#builder').on('afterCreateRuleInput.queryBuilder', function (e, rule) {
            //console.log('only  first rule element is changed');
            var r = rule;
            var $container = rule.$el.find('.rule-value-container');
            var $target = $container.find('select');
            var results = "";
            $target.on('change', function ($event) {
                //var index = -1;
                var allRules = angular.element('#builder').queryBuilder('getRules');
                var i = 0;
                var index = -1;
                groupLinearRules(rule.model.root.rules, r.id, index);

            });

            $target.bind('click', function ($event) {
                rule.data.reload = false;
                var ruleElementId = '#' + rule.data.ruleId;
                var ruleElement = angular.element(document.querySelector(ruleElementId));
                ruleElement.removeClass('beta');
                var errorElement = ruleElement.find('.error-container');
                errorElement.removeClass('alpha');

            });
        });
        function groupLinearRules(array, ruleId, index) {
            var d=false;
            angular.forEach(array, function (v, k) {
                if (v.id.indexOf('group') > -1) {
                    if (v.rules !== undefined) {
                        index = k;
                        if(!d){
                         groupLinearRules(v.rules, ruleId, index);
                        }
                    }
                }
                else {
                    if (v.data !== undefined) {
                        if (v.data.ruleId === ruleId) {
                            console.log(v);
                            index = k;
                            d=true;
                        }
                        if (index !== -1 && k > index) {
                            var ruleElementId = '#' + v.data.ruleId;
                            v.data.reload = true;
                            if (v.data.reload === true) {
                                var ruleElement = angular.element(document.querySelector(ruleElementId));
                                ruleElement.addClass('beta');
                                var errorElement = ruleElement.find('.error-container');
                                errorElement.addClass('alpha');
                                errorElement.attr('title', 'Reload Once again....');
                            }
                        }
                    }
                }
             //   console.log("key " + k);
              //  console.log("index " + index);
               
            });

        }

        angular.element("#builder").on('afterMove.queryBuilder', function (e, rule) {
            var index = -1;
            // alert(rule.id);
            groupLinearRules(rule.model.root.rules, rule.id, index);
        });
         
       angular.element("#builder").on('beforeDeleteRule.queryBuilder',function(e,rule){
            var index = -1;
            groupLinearRules(rule.model.root.rules, rule.id, index);
                 
       });



        angular.element('#builder').on('afterUpdateRuleValue.queryBuilder', function (e, rule) {

            var allRules = angular.element('#builder').queryBuilder('getRules');
            var r = rule;

            var $container = rule.$el.find('.rule-value-container');
            var $target = $container.find('select');



        });



        function isObject(item) {
            return (typeof item === "object" && item !== null);
        }




        angular.element('#builder').on('afterCreateRuleFilters.queryBuilder', function (e, rule) {
            console.log('creating the rule filter...');
        });



        angular.element('#builder').on('afterUpdateRuleValue.queryBuilder', function (e, rule) {






            //alert("afterUpdateRuleValue event triggered !");

            //update grpId again as it might have change by drag-n-drop operation     
            rule.data.grpId = rule.parent.id;

            var qbJson = angular.element('#builder').queryBuilder('getRules');
            var qbJsonStr = JSON.stringify(qbJson);

            var data = { ruleId: rule.id, grpId: rule.parent.id };
            var dataStr = JSON.stringify(data);

            //send change notification to server
            sendRuleValueChangeEvent(qbJsonStr, dataStr);

            //update rules reload status
            var curRulePos = rule.getPos();

            /*
            var $ruleNext = rule.$el.next();
            var indNext =  $ruleNext.index();
            alert("jquery - next rule index" + indNext);
            //var nextRuleModel=  angular.element('#builder').queryBuilder('getModel',$ruleNext);
            var nextRuleModel =  angular.element('#builder').queryBuilder('getModel',$ruleNext);
            var pos = nextRuleModel.getPos();
            alert("Rule Model - next rule position" + pos);
            */

            //parent refers to current group,use parent.parent for outer group
            // var parent = rule.parent.parent;
            // var rules = parent.rules;
            // for (var i = curRulePos + 1; i < rules.length; i++) {
            //     rules[i].data.reload = true;

            //     //css validations for cascading
            //     /*
            //     var $container = rules[i].$el.find('.rule-value-container');
            //     angular.element($container).css('border','1px solid red');
            //     */
            // }
        });


        $scope.setRules = function () {
            console.log("inside setRules");

            angular.element('#builder').queryBuilder('setFilters', qbFilters);

            /*
            var rulesObj = {"condition":"AND","rules":[{"id":"ta","field":"ta","type":"string","input":"select","operator":"equal","value":"t1"},
                               {"id":"indication","field":"indication","type":"string","input":"select","operator":"equal","value":"ind2"},
                               {"id":"phase","field":"phase","type":"string","input":"select","operator":"equal","value":"phase3"}],"valid":true};
            */

            var rulesObj = {
                "condition": "AND", "rules": [{ "id": "ta2", "field": "ta2", "type": "string", "input": "select", "operator": "equal", "value": "k2" },
                { "id": "ta2", "field": "ta2", "type": "string", "input": "select", "operator": "not_equal", "value": "1" }], "valid": true
            }
            angular.element('#builder').queryBuilder('setRules', rulesObj);
        };



    });
