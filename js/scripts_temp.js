$('.company').on('click', function (e) {
	e.preventDefault();

	var $parent = $(this).parents('.item'),
		$partners = $('#partners'),
		$partnersList = $('#partners-list'),
		companyPartners = data.list[$(this).data('company')].partners,
		partnersArray = [],
		sortBy = 'DESK',
		sortWhat = 'percentage-sort';

	console.log($parent);
	if ( $(this).hasClass('active') ) {
		$(this).removeClass('active');
		$partnersList.empty();
		$partners.hide();
		return;
	} else {
		if (!$partners.length) {
			var topBlock = '<div class="top-block"><h3>Company partners</h3><div class="sorting"><p><b>Sort by:</b> <a href="#" id="name-sort" class="sorting-btn">Name</a> <a href="#" id="percentage-sort" class="sorting-btn active" data-sort="DESC">Percentage</a></p></div></div>',
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

	// companyPartners.sort(function(a,b) {
	// 	if (a.name > b.name) {
	// 		return 1;
	// 	}
	// 	if (a.name < b.name) {
	// 		return -1;
	// 	}
	// });

	var sortingNum1,
		sortingNum2;
	function sorting(sortBy,sortWhat) {
		
		if (sortBy == 'DESC' && sortWhat == 'percentage-sort') {
			sortingNum1 = 1;
			sortingNum2 = -1;
		} else {
			sortingNum1 = -1;
			sortingNum2 = 1;
		}

		companyPartners.sort(function(a,b) {
			if (a.value > b.value) {
				return sortingNum1;
			}
			if (a.value < b.value) {
				return sortingNum2;
			}
		});
		return companyPartners;
	}
	// $('.sorting-btn').on('click', function (e) {
	// 	e.preventDefault();
	// 	if ( $(this).data('sort') ) {
	// 		sortBy = $(this).data('sort');
	// 		sortWhat = $(this).attr('id');
	// 		console.log(sortWhat);
	// 	} else {
	// 		$(this).attr('data-sort', 'ASC');
	// 		// console.log(test);
	// 	}
		
	// });
	$('#percentage-sort').on('click', function (e) {
		e.preventDefault();
		console.log('asd');
		if ( $(this).hasClass('active') ) {
			if ( $(this).data('sort') == 'DESC' ) {
				sortBy = 'ASC';
				sortWhat = 'percentage-sort';
				$(this).attr('sort', 'ASC');									
			} else {
				sortBy = 'DESC';
				$(this).attr('sort', 'DESC');
			}
		}
		

		
		
		
	});
	if ( $('#percentage-sort').hasClass('active') ) {
		if ($('#percentage-sort').data('sort') == 'DESC') {
			sortBy = 'DESC';
			sortWhat = 'percentage-sort';
			$(this).attr('data-sort','ASC');								
		} else {
			$(this).attr('data-sort','DESC');
			sortBy = 'ASC';
		}
		
	} else {
		console.log('hz');
	}
	console.log(companyPartners);
	sorting(sortBy, sortWhat);
	appendPartners(companyPartners);
	
	function appendPartners(partners) {
		for (var i = partners.length - 1; i >= 0; i--) {
			partnersArray += '<li><div class="value"><p>'+partners[i].value+'</p></div><div class="name"><p>'+partners[i].name+'</p></div></li>';
		}
		$('#partners-list').prepend(partners);
	}
	
	
});

// конец вывода партнеров компании
// вывод компаний END
$(document).ready(function() {
	'use strict';
	var $formReg = $('#form__reg');
	$formReg.on('submit', function (e) {
		e.preventDefault();
		var form_type_a = $(this);
		var data = new FormData($(this)[0]);
		$.ajax({
			type: "POST",
			url: "http://codeit.pro/frontTestTask/user/registration",
			data: data,
			contentType: false,
			processData: false,
			datatype: 'html',

			success: function (data) {
				form_type_a[0].reset();
				console.log(data);
			},
			error: function (data) {
				var errorMsg = data.statusText;
				console.log()
				if (errorMsg != 'error') {
					alert('Ошибка: '+errorMsg+'');
				} else {
					alert('Неизвестная ошибка.');
				}
			},

    	});
	});

	function companyPage() {
		var preloader = '<div class="preloader"><img src="img/preloader.gif" alt="" /></div>';
		$.ajax({
			type: "POST",
			url: "http://codeit.pro/frontTestTask/company/getList",
			contentType: false,
			processData: false,
			datatype: 'html',
			beforeSend: function () {
				$('.company-content').prepend('<div class="preloader"><img src="img/preloader.gif" alt="" /></div>');
			},
			success: function (data) {
				console.log(data.list);
				$('.preloader').remove();
				if (data.status == 'OK') {
					console.log('все ок');

					var $companyList = $('#company-list'),
					 	$totalCompanyDiv = $('#total-companies');
					// вывод общего кол-ва компаний
					$totalCompanyDiv.prepend('<div class="circle-company"><p> '+ data.list.length +' </p></div>  ')

					// вывод общего кол-ва компаний END

					// вывод компаний
					$companyList.append('<ul></ul>');
					for (var i = data.list.length - 1; i >= 0; i--) {
						$companyList.children('ul').prepend('<li><a href="#" class="company" data-company="'+i+'">'+ data.list[i].name +'</a></li>')
					}
					// вывод компаний END

					// вывод партнеров комании

					$('.company').on('click', function (e) {
						e.preventDefault();
						var $parent = $(this).parents('.item'),
							$partners = $('#partners'),
							$partnersList = $('#partners-list');
						console.log($parent);
						if ( $(this).hasClass('active') ) {
							console.log('active');
							$(this).removeClass('active');
							$partnersList.empty();
							$partners.hide();
							return;
						} else {
							if (!$partners.length) {
								var topBlock = '<div class="top-block"><h3>Company partners</h3><div class="sorting"><p><b>Sort by:</b> <a href="#" class="sorting-btn" data-sort="DESC">Name</a> <a href="#" class="sorting-btn" data-sort="DESC">Percentage</a></p></div></div>',
									partnerListBlock = '<div class="list-wrap"><ul id="partners-list"></ul></div>',
									partnerBlock = topBlock + partnerListBlock;
								$parent.after('<div id="partners">'+partnerBlock+'</div>');
								console.log('asdasd');
							}
							$('.company').removeClass('active');
							$(this).addClass('active');
							$partners.show();
						}
						var companyPartners = data.list[$(this).data('company')].partners;
						if ($('#partners ul').length) {
							$('#partners ul').empty();
							$('#partners').show();
						} else {						
							$('#partners').append('<ul></ul>');
						}
						for (var i = companyPartners.length - 1; i >= 0; i--) {
							// companyPartnersList.push(companyPartners[i].name);
						}

						companyPartners.sort(function(a,b) {
							if (a.name > b.name) {
								return 1;
							}
							if (a.name < b.name) {
								return -1;
							}
							// return b.value - a.value;
						});
						console.log(companyPartners);
						
						for (var i = companyPartners.length - 1; i >= 0; i--) {
							// $('#partners').children('ul').prepend('<li>'+ companyPartners[i].name +' '+ companyPartners[i].value +'</li>');
							$('#partners').children('.container').children('ul').prepend('<li><div class="value"><p>'+companyPartners[i].value+'</p></div><div class="name"><p>'+companyPartners[i].name+'</p></div></li>');
						}
					});

					// конец вывода партнеров компании
					// вывод компаний END

					// location
					var arr = [];
					var arr2 = {};
					var arr3 = {};
					for (var i = data.list.length - 1; i >= 0; i--) {
						if (arr2[data.list[i].location.name]!=undefined) {
							arr2[data.list[i].location.name]++
						} else {
							arr2[data.list[i].location.name]=1
						}
					}
					console.log(arr2);//число повторений для каждого элемента массива

					for (var i = arr2.length - 1; i >= 0; i--) {
						
					}
					console.log(arr2[1]);

					// var arr2={};
					// for(i in arr){
					// 	if (arr2[arr[i]]!=undefined) {
					// 		arr2[arr[i]]++
					// 	} else {
					// 		arr2[arr[i]]=1
					// 	}
					// }
					
					// location END
				} else {
					console.log('все плохо');
				}
				
			},
			error: function (data) {
				var errorMsg = data.statusText;
				console.log()
				if (errorMsg != 'error') {
					alert('Ошибка: '+errorMsg+'');
				} else {
					alert('Неизвестная ошибка.');
				}
			},
    	});
		$.ajax({
			type: "POST",
			url: "http://codeit.pro/frontTestTask/news/getList",
			contentType: false,
			processData: false,
			datatype: 'html',
			beforeSend: function () {
				$('#news').prepend(preloader);
			},
			success: function (data) {
				
				var data = data.list,
					date,
					articleDate = '',
					day,
					month,
					articleList = '',
					description;
				console.log(data);
				// console.log(articleDate);

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

					// articleList = "<p>"+description+"</p> ";
					articleList += '<div><div class="article"><div class="article__top-block"><div class="img"><img src="'+data[i].img+'" alt="'+data[i].author+'"></div><div class="text"><h4><a href="https://'+data[i].link+'>'+data[i].author+'</a></h4><p>'+description+'</p></div></div><div class="article__bottom-block"><p><b>Author:</b>'+data[i].author+'</p><p><b>Public:</b>'+articleDate+'</p></div></div></div>';
				}
					$('#owl-slider').prepend(articleList);
					// Slider();

					$(".owl-carousel").owlCarousel({
						items:1,
						margin:30,
						nav: true,
						loop:true
					});

				function Slider() {
					
				}
				
			},
			error: function (data) {
				var errorMsg = data.statusText;
				console.log()
				if (errorMsg != 'error') {
					alert('Ошибка: '+errorMsg+'');
				} else {
					alert('Неизвестная ошибка.');
				}
			},
    	});


	}
	(function () {
	    var preloader = '<div class="preloader"><img src="img/preloader.gif" alt="" /></div>',
	    	mainData;
		$.ajax({
			type: "POST",
			url: "http://codeit.pro/frontTestTask/company/getList",
			contentType: false,
			processData: false,
			datatype: 'html',
			beforeSend: function () {
				$('.company-content').prepend('<div class="preloader"><img src="img/preloader.gif" alt="" /></div>');
			},
			success: function (data) {
				mainData = data;
				console.log(data.list);
				$('.preloader').remove();
				if (data.status == 'OK') {
					console.log('все ок');

					var $companyList = $('#company-list'),
					 	$totalCompanyDiv = $('#total-companies');
					// вывод общего кол-ва компаний
					$totalCompanyDiv.prepend('<div class="circle-company"><p> '+ data.list.length +' </p></div>  ')

					// вывод общего кол-ва компаний END

					// вывод компаний
					$companyList.append('<ul></ul>');
					for (var i = data.list.length - 1; i >= 0; i--) {
						$companyList.children('ul').prepend('<li><a href="#" class="company" data-company="'+i+'">'+ data.list[i].name +'</a></li>')
					}
					// вывод компаний END

					// вывод партнеров комании

					$('.company').on('click', function (e) {
						e.preventDefault();

						var $parent = $(this).parents('.item'),
							$partners = $('#partners'),
							$partnersList = $('#partners-list'),
							companyPartners = data.list[$(this).data('company')].partners,
							partnersArray = [],
							sortBy,
							sortWhat,
							sortingNum1,
							sortingNum2;

						
						if ( $(this).hasClass('active') ) {
							$(this).removeClass('active');
							$partnersList.empty();
							$partners.hide();
							return;
						} else {
							if (!$partners.length) {
								var topBlock = '<div class="top-block"><h3>Company partners</h3><div class="sorting"><p><b>Sort by:</b> <a href="#" id="name-sort" class="sorting-btn">Name</a> <a href="#" id="percentage-sort" class="sorting-btn sorted" data-sort="DESC">Percentage</a></p></div></div>',
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

						// companyPartners.sort(function(a,b) {
						// 	if (a.name > b.name) {
						// 		return 1;
						// 	}
						// 	if (a.name < b.name) {
						// 		return -1;
						// 	}
						// });
						
						// $('.sorting-btn').on('click', function (e) {
						// 	e.preventDefault();
						// 	if ( $(this).data('sort') ) {
						// 		sortBy = $(this).data('sort');
						// 		sortWhat = $(this).attr('id');
						// 		console.log(sortWhat);
						// 	} else {
						// 		$(this).attr('data-sort', 'ASC');
						// 		// console.log(test);
						// 	}
							
						// });
						$('#percentage-sort').on('click', function (e) {
							e.preventDefault();
							// $('#partners-list').empty();
							console.log($('#partners-list'));
							if ($(this).data('sort') == 'DESC') {
								sortBy = 'ASC';
								$(this).attr('data-sort', sortBy);
								console.log('=desc');
							} else {
								sortBy = 'DESC';
								$(this).attr('data-sort', sortBy);
								console.log('=asc');
							}
							appendPartners(companyPartners, sortBy, sortWhat);
							console.log(appendPartners(companyPartners, sortBy, sortWhat));																										
						});
						// if ( $('#percentage-sort').hasClass('active') ) {
						// 	if ($('#percentage-sort').data('sort') == 'DESC') {
						// 		sortBy = 'DESC';
						// 		sortWhat = 'percentage-sort';
						// 		$(this).attr('data-sort','ASC');								
						// 	} else {
						// 		$(this).attr('data-sort','DESC');
						// 		sortBy = 'ASC';
						// 	}
							
						// } else {
						// 	console.log('hz');
						// }
						console.log(companyPartners);
						// sorting(sortBy, sortWhat);
						
						
						appendPartners(companyPartners, sortBy, sortWhat);
						
						function appendPartners(partners, sortBy, sortWhat) {
							if (sortBy == undefined || sortWhat == undefined ) {
								sortBy = $('.sorted').data('sort');
								sortWhat = $('.sorted').attr('id');
							}
							
							console.log(partners);
							
							partners = sorting(sortBy,sortWhat, partners);
							var partnersArray = [];
							console.log(partners);
							for (var i = partners.length - 1; i >= 0; i--) {
								partnersArray += '<li><div class="value"><p>'+partners[i].value+'</p></div><div class="name"><p>'+partners[i].name+'</p></div></li>';
							}

							$('#partners-list').prepend(partnersArray);
							return partnersArray;
						}

						function sorting(sortBy,sortWhat, partners) {
							
							if (sortBy == 'DESC' && sortWhat == 'percentage-sort') {
								sortingNum1 = 1;
								sortingNum2 = -1;
								console.log('desc');
							} else {
								sortingNum1 = -1;
								sortingNum2 = 1;
							}

							partners.sort(function(a,b) {
								if (a.value > b.value) {
									return sortingNum1;
								}
								if (a.value < b.value) {
									return sortingNum2;
								}
							});
							return partners;
						}
					});

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
					console.log(countryArr);//число повторений для каждого элемента массива

					var chartData = [],
						chartLabels = [];
					for (var key in countryArr) {

					    chartData.push(countryArr[key] * 100 / data.list.length);
					    chartLabels.push(key);			    
					}
					console.log(chartLabels);
					// Диаграмма
					chart(chartData, chartLabels);
					function chart(chartData, chartLabels) {
						var ctx = $("#myChart"),
							chartColors = [];

						for (var i = chartData.length - 1; i >= 0; i--) {
							chartColors.push(RandomColor());
						}
						console.log(chartColors);

						var myPieChart = new Chart(ctx,{
						    type: 'pie',
					        data: {
					            datasets: [{
					                data: chartData,
					                backgroundColor: chartColors,
					                // label: 'Dataset 1'
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
					        	    // titleFontColor: '#ff3030',
					        	    bodyFontColor: '#fff',
					        	    // backgroundColor: '#ff3030',
					        	    // backgroundColor: '#fff',
					        	    // footerFontColor:'#000',
					        	    // multiKeyBackground: '#00f',
					        	},
					        	legend: {
					        	    display: false,      	    
					        	},
					        	title: {
					        		// display: true,
					        		// text: 'Custom Chart Title',
					        	}
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
				} else {
					console.log('все плохо');
				}
				
			},
			error: function (data) {
				var errorMsg = data.statusText;
				console.log()
				if (errorMsg != 'error') {
					alert('Ошибка: '+errorMsg+'');
				} else {
					alert('Неизвестная ошибка.');
				}
			},
    	});
		$.ajax({
			type: "POST",
			url: "http://codeit.pro/frontTestTask/news/getList",
			contentType: false,
			processData: false,
			datatype: 'html',
			beforeSend: function () {
				$('#news').prepend(preloader);
			},
			success: function (data) {
				
				var data = data.list,
					date,
					articleDate = '',
					day,
					month,
					articleList = '',
					description;
				// console.log(articleDate);

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

					// articleList = "<p>"+description+"</p> ";
					articleList += '<div><div class="article"><div class="article__top-block"><div class="img"><img src="'+data[i].img+'" alt="'+data[i].author+'"></div><div class="text"><h4><a href="https://'+data[i].link+'">'+data[i].author+'(title)</a></h4><p>'+description+'</p></div></div><div class="article__bottom-block"><p><b>Author:</b>'+data[i].author+'</p><p><b>Public:</b>'+articleDate+'</p></div></div></div>';
				}
					$('#owl-slider').prepend(articleList);
					// Slider();


					$(".owl-carousel").owlCarousel({
						items:1,
						margin:30,
						nav: true,
						loop:true,
						dots: true,
					});

				function Slider() {
					
				}
				
			},
			error: function (data) {
				var errorMsg = data.statusText;
				console.log()
				if (errorMsg != 'error') {
					alert('Ошибка: '+errorMsg+'');
				} else {
					alert('Неизвестная ошибка.');
				}
			},
    	});
    	
    		// console.log(mainData);

	})();
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
	var ctx = $("#myChart"),
		chartData = [60,150,20, 10],
		chartLabels = ['USA', 'UA', 'BR', 'HZ'],
		chartColors = [];

	for (var i = chartData.length - 1; i >= 0; i--) {
		chartColors.push(RandomColor());
	}
	console.log(chartColors);

	// var myPieChart = new Chart(ctx,{
	//     type: 'pie',
 //        data: {
 //            datasets: [{
 //                data: chartData,
 //                backgroundColor: chartColors,
 //                // label: 'Dataset 1'
 //            }],
 //            labels: chartLabels
 //        },
 //        options: {
 //        	layout: {
	//            padding: {
	//                left: 0,
	//                right: 0,
	//                top: 25,
	//                bottom: 0
	//            }
	//        	},
 //        	tooltips: {
 //        	    intersect: true,
 //        	    enabled: true,
 //        	    displayColors: true,
 //        	    // titleFontColor: '#ff3030',
 //        	    bodyFontColor: '#fff',
 //        	    // backgroundColor: '#ff3030',
 //        	    // backgroundColor: '#fff',
 //        	    // footerFontColor:'#000',
 //        	    // multiKeyBackground: '#00f',
 //        	},
 //        	legend: {
 //        	    display: true,      	    
 //        	},
 //        	title: {
 //        		display: true,
 //        		text: 'Custom Chart Title',
 //        	}
 //        }
        

	// });
});




function function_name(argument) {
	$('.company').on('click', function (e) {
		e.preventDefault();
		var parent = $(this).parents('.item');
		console.log(parent);
		if ( $(this).hasClass('active') ) {
			$(this).removeClass('active');
			$('#partners ul').empty();
			$('#partners').hide();
			return;
		} else {
			$('.company').removeClass('active');
			$(this).addClass('active');
			$('#partners').show();
		}
		var companyPartners = data.list[$(this).data('company')].partners;
		if ($('#partners ul').length) {
			$('#partners ul').empty();
			$('#partners').show();
		} else {						
			$('#partners').append('<ul></ul>');
		}
		for (var i = companyPartners.length - 1; i >= 0; i--) {
			// companyPartnersList.push(companyPartners[i].name);
		}

		companyPartners.sort(function(a,b) {
			if (a.name > b.name) {
				return 1;
			}
			if (a.name < b.name) {
				return -1;
			}
			// return b.value - a.value;
		});
		console.log(companyPartners);
		
		for (var i = companyPartners.length - 1; i >= 0; i--) {
			// $('#partners').children('ul').prepend('<li>'+ companyPartners[i].name +' '+ companyPartners[i].value +'</li>');
			$('#partners').children('.container').children('ul').prepend('<li><div class="value"><p>'+companyPartners[i].value+'</p></div><div class="name"><p>'+companyPartners[i].name+'</p></div></li>')

		}
	});
}

// 18/09/2017 16:44
// 18/09/2017 16:44

// 18/09/2017 16:44

// 18/09/2017 16:44

// 18/09/2017 16:44


$(document).ready(function() {
	'use strict';
	var $formReg = $('#form__reg');
	$formReg.on('submit', function (e) {
		e.preventDefault();
		var form_type_a = $(this);
		var data = new FormData($(this)[0]);
		$.ajax({
			type: "POST",
			url: "http://codeit.pro/frontTestTask/user/registration",
			data: data,
			contentType: false,
			processData: false,
			datatype: 'html',

			success: function (data) {
				form_type_a[0].reset();
				console.log(data);
			},
			error: function (data) {
				var errorMsg = data.statusText;
				console.log()
				if (errorMsg != 'error') {
					alert('Ошибка: '+errorMsg+'');
				} else {
					alert('Неизвестная ошибка.');
				}
			},

    	});
	});

	function companyPage() {
		var preloader = '<div class="preloader"><img src="img/preloader.gif" alt="" /></div>';
		$.ajax({
			type: "POST",
			url: "http://codeit.pro/frontTestTask/company/getList",
			contentType: false,
			processData: false,
			datatype: 'html',
			beforeSend: function () {
				$('.company-content').prepend('<div class="preloader"><img src="img/preloader.gif" alt="" /></div>');
			},
			success: function (data) {
				console.log(data.list);
				$('.preloader').remove();
				if (data.status == 'OK') {
					console.log('все ок');

					var $companyList = $('#company-list'),
					 	$totalCompanyDiv = $('#total-companies');
					// вывод общего кол-ва компаний
					$totalCompanyDiv.prepend('<div class="circle-company"><p> '+ data.list.length +' </p></div>  ')

					// вывод общего кол-ва компаний END

					// вывод компаний
					$companyList.append('<ul></ul>');
					for (var i = data.list.length - 1; i >= 0; i--) {
						$companyList.children('ul').prepend('<li><a href="#" class="company" data-company="'+i+'">'+ data.list[i].name +'</a></li>')
					}
					// вывод компаний END

					// вывод партнеров комании

					$('.company').on('click', function (e) {
						e.preventDefault();
						var $parent = $(this).parents('.item'),
							$partners = $('#partners'),
							$partnersList = $('#partners-list');
						console.log($parent);
						if ( $(this).hasClass('active') ) {
							console.log('active');
							$(this).removeClass('active');
							$partnersList.empty();
							$partners.hide();
							return;
						} else {
							if (!$partners.length) {
								var topBlock = '<div class="top-block"><h3>Company partners</h3><div class="sorting"><p><b>Sort by:</b> <a href="#" class="sorting-btn" data-sort="DESC">Name</a> <a href="#" class="sorting-btn" data-sort="DESC">Percentage</a></p></div></div>',
									partnerListBlock = '<div class="list-wrap"><ul id="partners-list"></ul></div>',
									partnerBlock = topBlock + partnerListBlock;
								$parent.after('<div id="partners">'+partnerBlock+'</div>');
								console.log('asdasd');
							}
							$('.company').removeClass('active');
							$(this).addClass('active');
							$partners.show();
						}
						var companyPartners = data.list[$(this).data('company')].partners;
						if ($('#partners ul').length) {
							$('#partners ul').empty();
							$('#partners').show();
						} else {						
							$('#partners').append('<ul></ul>');
						}
						for (var i = companyPartners.length - 1; i >= 0; i--) {
							// companyPartnersList.push(companyPartners[i].name);
						}

						companyPartners.sort(function(a,b) {
							if (a.name > b.name) {
								return 1;
							}
							if (a.name < b.name) {
								return -1;
							}
							// return b.value - a.value;
						});
						console.log(companyPartners);
						
						for (var i = companyPartners.length - 1; i >= 0; i--) {
							// $('#partners').children('ul').prepend('<li>'+ companyPartners[i].name +' '+ companyPartners[i].value +'</li>');
							$('#partners').children('.container').children('ul').prepend('<li><div class="value"><p>'+companyPartners[i].value+'</p></div><div class="name"><p>'+companyPartners[i].name+'</p></div></li>');
						}
					});

					// конец вывода партнеров компании
					// вывод компаний END

					// location
					var arr = [];
					var arr2 = {};
					var arr3 = {};
					for (var i = data.list.length - 1; i >= 0; i--) {
						if (arr2[data.list[i].location.name]!=undefined) {
							arr2[data.list[i].location.name]++
						} else {
							arr2[data.list[i].location.name]=1
						}
					}
					console.log(arr2);//число повторений для каждого элемента массива

					for (var i = arr2.length - 1; i >= 0; i--) {
						
					}
					console.log(arr2[1]);

					// var arr2={};
					// for(i in arr){
					// 	if (arr2[arr[i]]!=undefined) {
					// 		arr2[arr[i]]++
					// 	} else {
					// 		arr2[arr[i]]=1
					// 	}
					// }
					
					// location END
				} else {
					console.log('все плохо');
				}
				
			},
			error: function (data) {
				var errorMsg = data.statusText;
				console.log()
				if (errorMsg != 'error') {
					alert('Ошибка: '+errorMsg+'');
				} else {
					alert('Неизвестная ошибка.');
				}
			},
    	});
		$.ajax({
			type: "POST",
			url: "http://codeit.pro/frontTestTask/news/getList",
			contentType: false,
			processData: false,
			datatype: 'html',
			beforeSend: function () {
				$('#news').prepend(preloader);
			},
			success: function (data) {
				
				var data = data.list,
					date,
					articleDate = '',
					day,
					month,
					articleList = '',
					description;
				console.log(data);
				// console.log(articleDate);

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

					// articleList = "<p>"+description+"</p> ";
					articleList += '<div><div class="article"><div class="article__top-block"><div class="img"><img src="'+data[i].img+'" alt="'+data[i].author+'"></div><div class="text"><h4><a href="https://'+data[i].link+'>'+data[i].author+'</a></h4><p>'+description+'</p></div></div><div class="article__bottom-block"><p><b>Author:</b>'+data[i].author+'</p><p><b>Public:</b>'+articleDate+'</p></div></div></div>';
				}
					$('#owl-slider').prepend(articleList);
					// Slider();

					$(".owl-carousel").owlCarousel({
						items:1,
						margin:30,
						nav: true,
						loop:true
					});

				function Slider() {
					
				}
				
			},
			error: function (data) {
				var errorMsg = data.statusText;
				console.log()
				if (errorMsg != 'error') {
					alert('Ошибка: '+errorMsg+'');
				} else {
					alert('Неизвестная ошибка.');
				}
			},
    	});


	}
	(function () {
	    var preloader = '<div class="preloader"><img src="img/preloader.gif" alt="" /></div>',
	    	mainData;
		$.ajax({
			type: "POST",
			url: "http://codeit.pro/frontTestTask/company/getList",
			contentType: false,
			processData: false,
			datatype: 'html',
			beforeSend: function () {
				$('.company-content').prepend('<div class="preloader"><img src="img/preloader.gif" alt="" /></div>');
			},
			success: function (data) {
				mainData = data;
				// console.log(data.list);
				$('.preloader').remove();
				if (data.status == 'OK') {

					var $companyList = $('#company-list'),
					 	$totalCompanyDiv = $('#total-companies');
					// вывод общего кол-ва компаний
					$totalCompanyDiv.prepend('<div class="circle-company"><p> '+ data.list.length +' </p></div>  ')

					// вывод общего кол-ва компаний END

					// вывод компаний
					$companyList.append('<ul></ul>');
					for (var i = data.list.length - 1; i >= 0; i--) {
						$companyList.children('ul').prepend('<li><a href="#" class="company" data-company="'+i+'">'+ data.list[i].name +'</a></li>')
					}
					// вывод компаний END

					// вывод партнеров комании

					$('.company').on('click', function (e) {
						e.preventDefault();

						var $parent = $(this).parents('.item'),
							$partners = $('#partners'),
							$partnersList = $('#partners-list'),
							companyNumber = $(this).data('company'),
							companyPartners = data.list[companyNumber].partners,
							partnersArray = [],
							sortBy,
							sortWhat,
							sortingNum1,
							sortingNum2;

						
						if ( $(this).hasClass('active') ) {
							$(this).removeClass('active');
							$partnersList.empty();
							$partners.hide();
							return;
						} else {
							if (!$partners.length) {
								var topBlock = '<div class="top-block"><h3>Company partners</h3><div class="sorting"><p><b>Sort by:</b> <a href="#" id="name-sort" class="sorting-btn">Name</a> <a href="#" id="percentage-sort" class="sorting-btn sorted" data-sort="DESC">Percentage</a></p></div></div>',
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

						$('#percentage-sort').on('click', function (e) {
							e.preventDefault();
							// console.log(companyPartners);
							var companyPartners = data.list[companyNumber].partners;
							$('#partners-list').empty();
							
							if ( $(this).hasClass('descsort') ) {
								sortBy = 'ASC';
								$(this).removeClass('descsort')
							} else {
								sortBy = 'DESC';
								$(this).addClass('descsort');
							}
							appendPartners(companyPartners, sortBy, sortWhat);
						});
						
						// sorting(sortBy, sortWhat);
						
						
						appendPartners(companyPartners, sortBy, sortWhat);
						
						function appendPartners(partners, sortBy, sortWhat) {
							if (sortWhat == undefined ) {
								// sortBy = $('.sorted').data('sort');
								sortWhat = $('.sorted').attr('id');
							}
							
							
							console.log(sortBy, '=сортбай');
							console.log(sortWhat, '=сорWhat');

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

							companyPartners.sort(function(a,b) {
								if (a.value > b.value) {
									return sortingNum1;
								}
								if (a.value < b.value) {
									return sortingNum2;
								}
							});
							return companyPartners;
						}

					});

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
					console.log(chartLabels);
					// Диаграмма
					chart(chartData, chartLabels);
					function chart(chartData, chartLabels) {
						var ctx = $("#myChart"),
							chartColors = [];

						for (var i = chartData.length - 1; i >= 0; i--) {
							chartColors.push(RandomColor());
						}

						var myPieChart = new Chart(ctx,{
						    type: 'pie',
					        data: {
					            datasets: [{
					                data: chartData,
					                backgroundColor: chartColors,
					                // label: 'Dataset 1'
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
					        	    // titleFontColor: '#ff3030',
					        	    bodyFontColor: '#fff',
					        	    // backgroundColor: '#ff3030',
					        	    // backgroundColor: '#fff',
					        	    // footerFontColor:'#000',
					        	    // multiKeyBackground: '#00f',
					        	},
					        	legend: {
					        	    display: false,      	    
					        	},
					        	title: {
					        		// display: true,
					        		// text: 'Custom Chart Title',
					        	}
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
				} else {
					console.log('все плохо');
				}
				
			},
			error: function (data) {
				var errorMsg = data.statusText;
				console.log()
				if (errorMsg != 'error') {
					alert('Ошибка: '+errorMsg+'');
				} else {
					alert('Неизвестная ошибка.');
				}
			},
    	});
		$.ajax({
			type: "POST",
			url: "http://codeit.pro/frontTestTask/news/getList",
			contentType: false,
			processData: false,
			datatype: 'html',
			beforeSend: function () {
				$('#news').prepend(preloader);
			},
			success: function (data) {
				
				var data = data.list,
					date,
					articleDate = '',
					day,
					month,
					articleList = '',
					description;
				// console.log(articleDate);

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

					// articleList = "<p>"+description+"</p> ";
					articleList += '<div><div class="article"><div class="article__top-block"><div class="img"><img src="'+data[i].img+'" alt="'+data[i].author+'"></div><div class="text"><h4><a href="https://'+data[i].link+'">'+data[i].author+'(title)</a></h4><p>'+description+'</p></div></div><div class="article__bottom-block"><p><b>Author:</b>'+data[i].author+'</p><p><b>Public:</b>'+articleDate+'</p></div></div></div>';
				}
					$('#owl-slider').prepend(articleList);
					// Slider();


					$(".owl-carousel").owlCarousel({
						items:1,
						margin:30,
						nav: true,
						loop:true,
						dots: true,
					});

				function Slider() {
					
				}
				
			},
			error: function (data) {
				var errorMsg = data.statusText;
				console.log()
				if (errorMsg != 'error') {
					alert('Ошибка: '+errorMsg+'');
				} else {
					alert('Неизвестная ошибка.');
				}
			},
    	});
    	
    		// console.log(mainData);

	})();

});