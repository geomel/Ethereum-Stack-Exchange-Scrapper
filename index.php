<?php
//initilize the page
require_once("inc/init.php");
$page_title = "StackExchange Scrapper";
$page_css[] = "your_style.css";
$no_main_header = true;
$page_body_prop = array("id"=>"login", "class"=>"animated fadeInDown");
include("inc/header.php");

?>
<!-- ==========================CONTENT STARTS HERE ========================== -->
<!-- MAIN PANEL -->
<div id="main" role="main">
	<!-- MAIN CONTENT -->
	<div id="content" style="padding: 30px;" >	
		<div class="row">
			<div id="searchControls">
				<div class="col-lg-6 col-lg-offset-3">
					<div class="input-group input-group-lg">
						<input type="text" class="form-control input-large"  placeholder="" id="search-project" /> 
						<span class="input-group-btn">
							<button type="submit" class="btn btn-default" id="search-button">
									&nbsp;&nbsp;&nbsp;<i class="fa fa-fw fa-search fa-lg"></i>&nbsp;&nbsp;&nbsp;
							</button>
						
					</div><!-- /input-group -->
				</div><!-- /.col-lg-4 -->
				<div class="col-lg-6 col-lg-offset-3">
					<form class="smart-form" >	
						<div class="ell">
								<section style="margin-top:10px;">
										<div class="inline-group" style="margin-left:5px;">
											<label class="radio">
												<input type="radio" name="results-filter"  value="0">
												<i></i>Ethereum</label>
												<label class="radio">
												<input type="radio" name="results-filter" value="1">
												<i></i>Bitcoin</label>		
											<label class="radio">
												<input type="radio" name="results-filter" value="2">
												<i></i>Tezos</label>
											<label class="radio">
												<input type="radio" name="results-filter" value="3">
												<i></i>EOS.IO</label>	
											<label class="radio">
												<input type="radio" name="results-filter" value="4">
												<i></i>StackOverflow</label>					
										</div>		
								</section>
							
							</div>
						</form>	
					</div>
			</div>
	
					
						<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12' style="margin-left:30px;">							
								
									<span class="note"><span id="results">  </span> <span id="execsqltime" style="margin-top:10px;"/> </span>
									<div class='smart-timeline'>	
										<ul class='smart-timeline-list'>
											<div id="ajax-timeline"> </div>					
									</div>
								<div id="synopsis-res" style="margin-bottom:30px;">
									 Technical Debt <span id="td"> </span><br>
								     Maintenance <span id="mntnc"> </span><br>
									 Design Patterns <span id="des_pat"> </span><br>
									 Software Metrics <span id="sof_met"> </span><br>
									 Refactorings <span id="rfctr"> </span><br>
									 Upgrade <span id="se"> </span>
								</div>	
								<div id="search-res"></div>	
									<div id="status" class="muted text-center">
										
									</div>
						</div>				
		</div>
		
	</div>
</div>	
<!-- ==========================CONTENT ENDS HERE ==========================
<div id='page-content'> </div>
  <ul id='pagination-demo' class='pagination-sm'></ul>
  
 -->  
<?php 
	include("inc/scripts.php"); 
?>

<script src="_/js/_index.js"></script>
