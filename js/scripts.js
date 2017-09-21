$(document).ready(function() {
	'use strict';
	// form-page
	(function () {
		var $formReg = $('#formReg');
		if ($formReg.length === 0) {return;}; // Проверяем есть ли такой эл. на странице
		$.validator.addMethod("valueNotEquals", function(value, element, arg){
			return arg !== value;
		}, "Value must not equal arg."); // добавляем правило валидации
		$formReg.validate({
			rules: {
				name: {
					required: true,
	                minlength: 3,
	                maxlength: 60,
				},
				secondname: {
					required: true,
	                minlength: 3,
	                maxlength: 60,
				},
				email: {
				  required: true,
				  email: true,
				},
				pass: {
					required: true,
	                minlength: 6,
	                maxlength: 16,
				},
				gender: { valueNotEquals: "default" }								   
			},
			messages: {
				name: {
					required: 'Username is required.',
	                minlength: 'Username should contain min 4 letters.',
	                maxlength: 'Username should contain max 60 letters.',
				},
				secondname: {
					required: 'Secondname is required.',
	                minlength: 'Secondname should contain min 4 letters.',
	                maxlength: 'Secondname should contain max 60 letters.',
				},
			    email: {
			      required: 'Email is required.',
			      email: 'Email is not valid.'
			    },
			    pass: {
					required: 'Password is required.',
	                minlength: 'Password should contain min 6 letters.',
	                maxlength: 'Password should contain max 16 letters.',
			    },
			    gender: { valueNotEquals: 'Gender is required.' }
			},
			submitHandler: function(form) {
				var form_type_a = $formReg;
				var data = new FormData($formReg[0]);
				$.ajax({
					url: "http://codeit.pro/frontTestTask/user/registration",
					data: data,
					contentType: false,
					processData: false,
					datatype: 'html',
					success: function (data) {
						
						if (data.status == 'Error') {
							alert(data.message);
						} else if(data.status == 'Form Error') {
							alert(data.message);
						} else if (data.message == 'User created' && data.status == 'OK') {
							window.location.href = 'company.php';
						}
					},
					error: function (data) {
						var errorMsg = data.statusText;
						if (errorMsg != 'error') {
							alert('Ошибка: '+errorMsg+'');
						} else {
							alert('Неизвестная ошибка.');
						}
					},
		    	});
			}
		});	

	})();
	// form-page END

	// company-page
	(function () {
		if($('#companiesWrap').length === 0) {return;} // Проверяем есть ли такой эл. на странице
	    var preloader = '<div class="preloader"><img src="img/preloader.gif" alt="" /></div>';
		$.ajax({
			url: "http://codeit.pro/frontTestTask/company/getList",
			contentType: false,
			processData: false,
			datatype: 'html',
			beforeSend: function () {
				$('.companyContent').prepend(preloader);
			},
			success: function (data) {
				if (data.status == 'OK') {
					companyList(data);
				}		
			},
			error: function (data) {
				var errorMsg = data.statusText;
				if (errorMsg != 'error') {
					alert('Ошибка: '+errorMsg+'');
				} else {
					alert('Неизвестная ошибка.');
				}
			},
    	});
		$.ajax({
			url: "http://codeit.pro/frontTestTask/news/getList",
			contentType: false,
			processData: false,
			datatype: 'html',
			beforeSend: function () {
				$('#news').prepend(preloader);
			},
			success: function (data) {
				if (data.status == 'OK') {
					showNews(data);
				}													
			},
			error: function (data) {
				var errorMsg = data.statusText;
				if (errorMsg != 'error') {
					alert('Ошибка: '+errorMsg+'');
				} else {
					alert('Неизвестная ошибка.');
				}
			},
    	});
		// news func
    	function showNews(data) {
    		var data = data.list,
    			date,
    			articleDate = '',
    			day,
    			month,
    			articleList = '',
    			description;

    		for (var i = data.length - 1; i >= 0; i--) {
    			date = new Date(data[i].date*1000);
    			day = date.getDate();
    			month = date.getMonth();
    			description = data[i].description;
    			if (String(day).length < 2 ) {
    				day = '0' + date.getDate();
    			}
    			if (String(month).length < 2 ) {
    				month = '0' + date.getMonth();
    			}
    			articleDate = day + '.' + month + '.' + date.getFullYear();
    			if (description.length > 200) {
    				
    				description = description.substr(0,200);
    				description = description.split(' ');
    				description.splice(description.length-1,1);
    				description = description.join(' ');
    				description = description + '...';
    			}
    			articleList += '<div><div class="article"><div class="article__top-block"><div class="img"><img src="'+data[i].img+'" alt="'+data[i].author+'"></div><div class="text"><h4><a href="https://'+data[i].link+'">'+data[i].author+'(title)</a></h4><p>'+description+'</p></div></div><div class="article__bottom-block"><p><b>Author:</b> '+data[i].author+'</p><p><b>Public:</b> '+articleDate+'</p></div></div></div>';
    		}
    			$('#owl-slider').prepend(articleList);


    			$('.owl-carousel').owlCarousel({
    				items:1,
    				margin:30,
    				nav: false,
    				loop:true,
    				dots: true,
    			});
    	}
    	// news func END
    	// company func
    	function companyList(data) {
    		$('.preloader').remove();
    		

			var $companyList = $('#companyList'),
			 	$totalCompanyDiv = $('#totalCompanies');
			// вывод общего кол-ва компаний
			$totalCompanyDiv.prepend('<div class="circleCompany"><p> '+ data.list.length +' </p></div>  ');

			// вывод общего кол-ва компаний END

			// вывод компаний
			$companyList.append('<ul></ul>');
			for (var i = data.list.length - 1; i >= 0; i--) {
				$companyList.children('ul').prepend('<li><a href="#" class="company" data-company="'+i+'">'+ data.list[i].name +'</a></li>')
			}
			// вывод компаний END

			// вывод партнеров комании
			var $parent,
				$partners,
				$partnersList,
				companyNumber,
				companyPartners,
				partnersArray = [],
				sortBy,
				sortWhat,
				sortingNum1,
				sortingNum2;
				
			
				$('.company').on('click', function (e) {
    				e.preventDefault();
    				
    				$parent = $(this).parents('.item');
					companyNumber = $(this).data('company');
					companyPartners = data.list[companyNumber].partners;
					$partners = $('#partners');
    				$partnersList = $('#partners-list');

    				if ( $(this).hasClass('active') ) {
    					$(this).removeClass('active');
    					$partnersList.empty();
    					$partners.hide();
    					return;
    				} else {
    					if (!$partners.length) {
    						var topBlock = '<div class="topBlock"><h3>Company partners</h3><div class="sorting"><p><b>Sort by:</b> <a href="#" id="nameSort" class="sorting-btn">Name</a> <a href="#" id="percentageSort" class="sorting-btn sorted descsort" sorting="DESC">Percentage</a></p></div></div>',
    							partnerListBlock = '<div class="list-wrap"><ul id="partners-list"></ul></div>',
    							partnerBlock = topBlock + partnerListBlock;
    						$parent.after('<div id="partners"><div class="list-outer">'+partnerBlock+'</div></div>');
    					}
    					$('.company').removeClass('active');
    					$(this).addClass('active');
    					$partners.show();
    				}
    				if ($partnersList.children('li').length) {
    					$partnersList.empty();
    					$partners.show();
    				}

    				
    				// Сортировка изначальная
    				sortBy = $('#partners .sorted').attr('sorting');
    				sortWhat = $('#partners .sorted').attr('id');
    				// Сортировка изначальная
    				var currentSortMethod;
    				
    				appendPartners(companyPartners, sortBy, sortWhat);
    				
    				$('#percentageSort').off('click');
    				
    				$('#percentageSort').on('click', function (e) {
    					e.preventDefault();
    					sortWhat = 'percentage-sort';
    					currentSortMethod = $(this).attr('sorting');
    					$('#partners-list').empty();
    					$('#nameSort').removeAttr('sorting').removeClass('sorted descsort ascsort');
					
    					if ( currentSortMethod == 'DESC' ) {
    						sortBy = 'ASC';
    						$(this).attr('sorting', 'ASC');
    						$(this).removeClass('descsort').addClass('ascsort sorted');
    					} else if (currentSortMethod == undefined && !$(this).hasClass('sorted')) {
    						sortBy = 'DESC';
    						$(this).attr('sorting','DESC').addClass('descsort sorted');
    						
    					} else {
    						sortBy = 'DESC';
    						$(this).attr('sorting', 'DESC');
    						$(this).removeClass('ascsort').addClass('descsort sorted');
    					}

    					appendPartners(companyPartners, sortBy, sortWhat);
    				});

    				
    				$('#nameSort').off('click');
    				$('#nameSort').on('click', function (e) {
    					e.preventDefault();
    					sortWhat = 'name-sort';
    					currentSortMethod = $(this).attr('sorting');
    					$('#partners-list').empty();
    					$('#percentageSort').removeAttr('sorting').removeClass('sorted descsort ascsort');

    					if ( currentSortMethod == 'DESC' ) {
    						sortBy = 'ASC';
    						$(this).attr('sorting', 'ASC');
    						$(this).removeClass('descsort').addClass('ascsort sorted');
    					} else if (currentSortMethod == undefined && !$(this).hasClass('sorted')) {
    						sortBy = 'DESC';
    						$(this).attr('sorting','DESC').addClass('descsort sorted');
    						
    					} else {
    						sortBy = 'DESC';
    						$(this).attr('sorting', 'DESC');
    						$(this).removeClass('ascsort').addClass('descsort sorted');
    					}
    					appendPartners(companyPartners, sortBy, sortWhat);
    				});

    			});
    			
    			function appendPartners(partners, sortBy, sortWhat) {
    				partners = sorting(sortBy,sortWhat);
    				var partnersArray = [];
    				for (var i = partners.length - 1; i >= 0; i--) {
    					partnersArray += '<li><div class="value"><p>'+partners[i].value+'</p></div><div class="name"><p>'+partners[i].name+'</p></div></li>';
    				}

    				$('#partners-list').prepend(partnersArray);
    				return partnersArray;
    			}

    			function sorting(sortBy,sortWhat) {
    				if (sortBy == 'DESC') {
    					sortingNum1 = 1;
    					sortingNum2 = -1;
    				} else {
    					sortingNum1 = -1;
    					sortingNum2 = 1;
    				}
    				if (sortWhat == 'percentage-sort') {
    					companyPartners.sort(function(a,b) {
    						if (a.value > b.value) {
    							return sortingNum1;
    						}
    						if (a.value < b.value) {
    							return sortingNum2;
    						}
    					});
    				} else if (sortWhat == 'name-sort') {
    					companyPartners.sort(function(a,b) {
    						if (a.name > b.name) {
    							return sortingNum1;
    						}
    						if (a.name < b.name) {
    							return sortingNum2;
    						}
    					});
    				}
    				
    				return companyPartners;
    			}
			
			

			// конец вывода партнеров компании
			// вывод компаний END

			// location
			var countryArr = {};

			for (var i = data.list.length - 1; i >= 0; i--) {
				if (countryArr[data.list[i].location.name]!=undefined) {
					countryArr[data.list[i].location.name]++
				} else {
					countryArr[data.list[i].location.name]=1
				}
			}
			

			var chartData = [],
				chartLabels = [];
			for (var key in countryArr) {

			    chartData.push(countryArr[key] * 100 / data.list.length);
			    chartLabels.push(key);			    
			}
			// Диаграмма
			chart(chartData, chartLabels);
			function chart(chartData, chartLabels) {
				var ctx = $("#myChart"),
					chartColors = [];

				for (var i = chartData.length - 1; i >= 0; i--) {
					chartColors.push(RandomColor());
				}
				$('#myChart').on('click', function (e) {
					
					var item = myPieChart.getElementAtEvent(e)[0],
						country = item._model.label,
						list = data.list,
						company = '';
					for (var i = list.length - 1; i >= 0; i--) {
						if (list[i].location.name == country) {
							company += '<li>'+list[i].name+'</li>';
						}
					}
					$('#myChart').hide();

					if ( $('#companyLoc .countryListWrap').length ) {
						$('#companyLoc .countryListWrap h4').empty().append(country + ':');
						$('#companyLoc .countryListWrap, #backBtn').show();
						$('#companyLoc .countryList').empty().append(company);
						$('#companyLoc .countryList').scrollTop(0);
					} else {
						$('#companyLoc').append('<div class="countryListWrap"><h4>'+country+':</h4><ul class="countryList">'+company+'</ul></div>');
						$('#companyLoc').parent('.itemWrap').append('<a href="#" id="backBtn"></a>');
					}

					
					
					$('#backBtn').on('click', function (e) {
						e.preventDefault();
						$('#companyLoc .countryListWrap, #backBtn').hide();
						$('#myChart').show();
					});
				});
				
				var myPieChart = new Chart(ctx,{
				    type: 'pie',
			        data: {
			            datasets: [{
			                data: chartData,
			                backgroundColor: chartColors,
			            }],
			            labels: chartLabels
			        },
			        options: {
			        	layout: {
				           padding: {
				               left: 0,
				               right: 0,
				               top: 25,
				               bottom: 0
				           }
				       	},
			        	tooltips: {
			        	    intersect: true,
			        	    enabled: true,
			        	    displayColors: true,
			        	    bodyFontColor: '#fff',
			        	},
			        	legend: {
			        	    display: false,      	    
			        	},
			        }					        
				});
				function RandomColor() {
					var max = 150,
					min = 10;
					var r = Math.floor(Math.random() * (256));
					var g = Math.floor(Math.random() * (256));
					var b = Math.floor(Math.random() * (256));
					var o = (Math.random() * 1);
					var c = 'rgba(' + r + ', ' + g + ', ' + b + ', 1)';
					return c;
				};
			}
			// Диаграмма END
			

			// location END
    	}
    	// company func END

	})();
	// company-page END
});