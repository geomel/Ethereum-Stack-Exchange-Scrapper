function refreshTimeLine(){
        $('#ajax-timeline').load('_/php/_timeline.php', function(){		
        });
    }
	
	$(document).ready(function() {
		$('#wiz').hide();
		$('#ajax-timeline').hide();
		$('#loading').hide();
		$("input:radio[name=results-filter]").click(function() {
			var value = $(this).val();
			switch (value) {
					case("0"):
						$('#ajax-timeline').hide();
						$("#search-project").attr("placeholder", "Search on Ethereum: eg &tagged=javascript&sort=month&filter=unsafe");
						$('#search-res').show();
						$("#search-project").removeAttr("disabled");
						$("#search-project").focus();	
						// $("#search-res").load("_/php/_search.php");
						// $("#execsqltime").load("_/php/_search.php #sqltime");
						// getStackExchangeData("ethereum");
						break;
					case("1"):
						$('#ajax-timeline').hide();
						$('#search-res').show();
						$("#search-project").removeAttr("disabled");
						$("#search-project").attr("placeholder", "Search on Bitcoin: eg &tagged=javascript&sort=month&filter=unsafe");
						$("#search-project").focus();
						// getStackExchangeData("bitcoin");
						break;	
                    case ("2"):
						$('#search-res').show();
						// refreshTimeLine();
						// $("#execsqltime").load("_/php/_search.php #sqltime");
                        $('#ajax-timeline').hide();
						$("#search-project").attr("placeholder", "Search on Tezos: eg &tagged=javascript&sort=month&filter=unsafe");
					//	$('#mailnotification').hide();
						// getStackExchangeData("tezos");
                        break;
					case ("3"):
						$('#search-res').show();
						// refreshTimeLine();
						// $("#execsqltime").load("_/php/_search.php #sqltime");
                        $('#ajax-timeline').hide();
						$("#search-project").attr("placeholder", "Search on EOS.io: eg &tagged=javascript&sort=month&filter=unsafe");
					//	$('#mailnotification').hide();
						// getStackExchangeData("eosio");
                        break;	
					case ("4"):
						$('#search-res').show();
						// refreshTimeLine();
						// $("#execsqltime").load("_/php/_search.php #sqltime");
                        $('#ajax-timeline').hide();
						$("#search-project").attr("placeholder", "Search on StackOverflow: eg &tagged=javascript&sort=month&filter=unsafe");
					//	$('#mailnotification').hide();
						// getStackExchangeData("eosio");
                        break;
					}	
		});
			
				
	//	$('#mailnotification').hide();		
			
		$("#search-project").focus();	
		
	//	$("#execsqltime").load("_/php/_search.php #sqltime");
	
		$('#search-project').keypress(function(e) {
			if(e.which == 13) {
				search_parameters = $("#search-project").val();
				$('#search-res').show();
		//		$('#mailnotification').hide();
				if($('input:radio[name=results-filter]:checked').val()=="0")
					// $("#search-res").load("_/php/_search.php?search_value=" + $("#search-project").val() + "&flag=1");
					getStackExchangeData("ethereum", search_parameters,1,0,0,0,0,0,0);
				else if($('input:radio[name=results-filter]:checked').val()=="1")
					getStackExchangeData("bitcoin", search_parameters,1,0,0,0,0,0,0);
				else if($('input:radio[name=results-filter]:checked').val()=="2")
					getStackExchangeData("tezos", search_parameters,1,0,0,0,0,0,0);
				else if ($('input:radio[name=results-filter]:checked').val()=="3")
					getStackExchangeData("eosio", search_parameters,1,0,0,0,0,0,0);
				else if ($('input:radio[name=results-filter]:checked').val()=="4")
					getStackExchangeData("stackoverflow", search_parameters,1,0,0,0,0,0,0);	
				else{	
					/*
					$("#search-res").load("_/php/_search.php?search_value=" + $("#search-project").val()  + "&flag=0",function (text, statusText){
					$("#execsqltime").load("_/php/_search.php #sqltime");
					});
					*/
					getStackExchangeData("ethereum", search_parameters,1,0,0,0,0,0,0,0);
					
				}			
					}	
			  });
			  
			  
			  
			$("#search-button").click(function(){
				$('#search-res').show();
			//	$('#mailnotification').hide();
				$("#search-res").load("_/php/_search.php?search_value=" + $("#search-project").val()+"&filter_flag=0",function (text, statusText){
					$("#execsqltime").load("_/php/_search.php #sqltime");
						});	
			});	
		
		$("#mailbtn").click(function(e) {
		//	$('#mailnotification').hide();
		//	document.getElementById("execsqltime").innerHTML = "Thank You.<p>A notification email will be sent when the proccess will complete at: " + $('#email').val() ;
            $.ajax({ url: '_/php/_sendmail.php?reciever=' + $('#email').val() });
		});	
		
		// $('#checkVersions').hide();

	})


	function getStackExchangeData(site, query, page, t, m, dp, sm, rf, s){
		
		var i=page;
		var td = t; //technical debt
		var mntnc = m; //maintenance
		var se = s; // software engineering
		var rfctr = rf; // refactoring
		var des_pat = dp; // design patterns
		var sof_met = sm; // software metrics


		// const url = 'http://api.stackexchange.com/2.2/questions?site=' + site + query + '&key=uaDIcewqTjP35DNg8qqGWA((';
		const url = 'http://api.stackexchange.com/2.2/questions?site=' + site + '&page=' + i + query + '&filter=unsafe&key=uaDIcewqTjP35DNg8qqGWA((';
			
			/*
			$.getJSON(url, function( data2 ) {
				 var resultsJSON = JSON.stringify(data2);
				 obj = $.parseJSON(resultsJSON);
				//console.log(obj['has_more']);	
				console.log(resultsJSON);
			
			});
			*/
			
			$.getJSON(url, function(data) {
							
				var resultsJSON = JSON.stringify(data);			
				//$("#search-res").append(resultsJSON);
				obj = $.parseJSON(resultsJSON);
				
			//	console.log(resultsJSON.match(/java/gi));
			//	console.log(resultsJSON.match(/java/gi).length);
			
			
			if(resultsJSON.match(/technical debt | technical-debt/g) != null){
			//	$("#search-res").append("<p class='font-lg text-success text-center'> Technical Debt: <p>");
				td += resultsJSON.match(/technical debt | technical-debt/g).length;
				$("#search-res").append(resultsJSON);
			}
			
			if(resultsJSON.match(/maintenance | maintenability/g) != null){
			//	$("#search-res").append("<p class='font-lg text-success text-center'> Maintenance: <p>");
				mntnc += resultsJSON.match(/maintenance | maintenability/g).length;
				$("#search-res").append(resultsJSON);
			}
			if(resultsJSON.match(/design patterns/g) != null){
			//	$("#search-res").append("<p class='font-lg text-success text-center'> Design Patterns: <p>");
				des_pat += resultsJSON.match(/design patterns/g).length;
				$("#search-res").append(resultsJSON);
			}	
			if(resultsJSON.match(/software metrics/g) != null){
			//	$("#search-res").append("<p class='font-lg text-success text-center'> Software Metrics: <p>");
				sof_met += resultsJSON.match(/software metrics/g).length;
				$("#search-res").append(resultsJSON);
			}
			if(resultsJSON.match(/refactor | refactoring | refactored/g) != null){
			//	$("#search-res").append("<p class='font-lg text-success text-center'> Refactoring: <p>");
				rfctr += resultsJSON.match(/refactor | refactoring | refactored/g).length;
				$("#search-res").append(resultsJSON);
			}	
			if(resultsJSON.match(/upgradeable | upgrade | upgradeability/g) != null){
			//	$("#search-res").append("<p class='font-lg text-success text-center'> Software Engineering: <p>");
				se += resultsJSON.match(/upgradeable | upgradeability | upgrade/g).length;
				$("#search-res").append(resultsJSON);
			}	
				
				
			//console.log(resultsJSON.match(/patterns/gi));
				console.log(obj['has_more']);	
					i++;
					$("#td").text(td);
					$("#mntnc").text(mntnc);
					$("#des_pat").text(des_pat);
					$("#sof_met").text(sof_met);
					$("#rfctr").text(rfctr);
					$("#se").text(se);
					getStackExchangeData(site, query, i, td, mntnc, des_pat, sof_met, rfctr, se);

/*
				if(obj['has_more']){
					$("#td").text(td);
					$("#mntnc").text(mntnc);
					$("#rfctr").text(rfctr);
					$("#se").text(se);
					getStackExchangeData(site, query, i, td, mntnc, se, rfctr);
				}	
				else{
					$("#search-res").append(resultsJSON);
					$("#search-res").append("<p> End");					
				}
*/

			});
		

		function newFunction() {
			return "Helooooooo";
		}
		/*
		  fetch(url).then(response => response.json()).then(data => {
			  
		  if (data.error_message) {
			throw new Error(data.error_message);
		  }
		  
		  const list = document.createElement('ol');
		  document.body.appendChild(list);
  				
		  for (const {title, link, body} of data.items) {
			const entry = document.createElement('li');
			const hyperlink = document.createElement('a');
			entry.appendChild(hyperlink);
			list.appendChild(entry);

			hyperlink.textContent = body;
			hyperlink.href = link;
		  }
		}).then(null, error => {
		  const message = document.createElement('pre');
		  document.body.appendChild(message);
		  message.style.color = 'red';

		  message.textContent = String(error);
		});		
		*/
		
	}


	
	function runWizard(){
		$('#wiz').show();
		$('#searchControls').hide();
		$('#loading').show();
		getVersions();
	}

	function getVersions(){
       // openSocket();
	//	$('#mailnotification').show();
		$('#analyzebtn').hide();
		$('#search-res').hide();
		gpath = $('#search-project').val();
        reciever_email = $('#email').val();
     //   alert('_/php/_trigger_java.php?gitpath=' + gpath + '&reciever=' + reciever_email);
		$.ajax({ url: '_/php/_trigger_java.php?gitpath=' + gpath ,
		data: {
               
			   },
		success: function(result) { // trims json data from server to be valid
		   result = result.slice(34);
		   var json = JSON.stringify(eval("(" + result ));
		   json = JSON.parse(json);
		   $('#checkVersions').show();
		   var $grouplist = $('#checkVersions');
		   $.each(json, function() {
				$('<label class="checkbox"><input type="checkbox" class="check" name="check[]" checked="checked" value=\''+this.id+'\'><i></i>(' + 
				this.date + ")   " + this.name + '</label>').appendTo($grouplist);
				});		
			},
		complete: function() {
			
			$('#loading').hide();
		
		}
		});
}

	function runJava(){
        openSocket();
		gpath = $('#search-project').val();
        reciever_email = $('#email').val();
		var versions_json={};
		var version = [];
		versions_json =  $("#checkVersions input:checkbox:checked").map(function(){
			 version.push($(this).val());
		});	
	
		jsonSelectedVeriosns = JSON.stringify(version);
		
		$.ajax({ url: '_/php/_trigger_java.php?ready2Analyze=' +  jsonSelectedVeriosns,
		data: {
               
			   },
		success: function(result) { 
		   	
		}
		});
}

    $('#selectall').click(function(event) {  //on click 
        if(this.checked) { // check select status
            $('.check').each(function() { //loop through each checkbox
                this.checked = true;  //select all checkboxes with class "checkbox1"               
            });
        }else{
            $('.check').each(function() { //loop through each checkbox
                this.checked = false; //deselect all checkboxes with class "checkbox1"                       
            });         
        }
    });
    
/*
 function readServerLog(gpath){
	$.ajax({
        url: "http://se.uom.gr/seagle/logs/"+gpath+".txt",
        dataType: 'text',
        success: function(text) {
         $("#server_data").html(text);
		 $("#server_data:contains(Finished!)").css("background","url(assets/css/img/done.png) right no-repeat #efefef")
			 setTimeout(readServerLog(gpath), 4000); // refresh every 4 seconds
        }
		
	}).done(function() {
			$("#search-res").load("_/php/_search.php?val=" + "geomel");
		});
	}	
*/
	
var webSocket;

function openSocket() {
    // Ensures only one connection is open at a time
    if (webSocket !== undefined && webSocket.readyState !== WebSocket.CLOSED) {
        writeResponse("WebSocket is already opened.");
        return;
    }
    // Create a new instance of the websocket
    webSocket = new WebSocket("ws://se.uom.gr:8080/seanetsweb/loggerSocket");

    /**
     * Binds functions to the listeners for the websocket.
     */
    webSocket.onopen = function(event) {
        // For reasons I can't determine, onopen gets called twice
        // and the first time event.data is undefined.
        // Leave a comment if you know the answer.
        if (event.data === undefined)
            return;

        writeResponse(event.data);
    };

    webSocket.onmessage = function(event) {
		if(event.data=="Finished!"){
			writeResponse(event.data);
			closeSocket();
		}else
			writeResponse(event.data);	
    };

    webSocket.onclose = function(event) {
        writeResponse("The analysis for the project you requested, is now complete.");
		// refreshTimeline();
		
		$.ajax({ url: '_/php/_trigger_java.php?mailnotification=' + $('#email').val() + '00' + $("#search-project").val() ,
		data: {
               
			   },
		success: function(result) { 
					$('#ajax-timeline').load('_/php/_timeline.php', function(){		
				});
				$('#wiz').hide();
				$('#searchControls').show();
				$('#ajax-timeline').show();
			}
		});
    };
}

/**
 * Sends the value of the text input to the server
 */
function send(text) {
    webSocket.send(text);
}

function closeSocket() {
    webSocket.close();
}

function writeResponse(text) {
    document.getElementById("status").innerHTML = "<br/>" + text;
}	


 //$.ajax({ url: '_/php/_sendmail.php?reciever=' + $('#email').val() });

