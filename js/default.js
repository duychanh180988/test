$(document).ready(function() {
	callContries();
	$("#reset").click(function () {
		$("#contriesSelect").val("Select")
		$("#detail").html("")
	});
	$("#submit").click(function (e) {
		var validate = Validate();
		$("#detail").html(validate);
		if (validate.length == 0) {
			$.ajax({
				url: "https://api.covid19api.com/summary",
				method:"get",
				dataType: "json",
				success: function (result, status, xhr) {
					var table = $("<table><tr><th>Covid-19 information</th></tr>");

					$.each(result, function(key, val){
						table.append("<tr><td>Country:</td><td>" + val["Countries"]["Country"] + "</td></tr>");
						table.append("<tr><td>Country Code:</td><td>" + val["Countries"]["CountryCode"] + "</td></tr>");
						table.append("<tr><td>Date:</td><td>" + val["Countries"]["Date"] + "</td></tr>");
						table.append("<tr><td>New Confirmed:</td><td>" + val["Countries"]["NewConfirmed"] + "</td></tr>");
						table.append("<tr><td>Total Confirmed:</td><td>" + val["Countries"]["TotalConfirmed"] + "</td></tr>");
						table.append("<tr><td>New Deaths:</td><td>" + val["Countries"]["NewDeaths"] + "</td></tr>");
						table.append("<tr><td>Total Deaths:</td><td>" + val["Countries"]["TotalDeaths"] + "</td></tr>");
						table.append("<tr><td>New Recovered:</td><td>" + val["Countries"]["NewRecovered"] + "</td></tr>");
						table.append("<tr><td>Total Recovered:</td><td>" + val["Countries"]["TotalRecovered"] + "</td></tr>");
					});
					$("#detail").html(table);
				},
				error: function (xhr, status, error) {
					alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
				}
			});
		}
	});
	function Validate() {
		var errorMessage = "";
		if ($("#contriesSelect").val() == "Select") {
			errorMessage += "<p>Please Select Contry</p>";
		}
		return errorMessage;
	}
});

function callContries()
{
	$.ajax({
		url:"https://api.covid19api.com/countries",
		method:"get",
		dataType:"json",
		success: function(data, msg){
			var text = "";
			text+="<option value='Select'> — Select a country — </option>";
			$.each(data, function(key, val){
				text+="<option values="+val.ISO2+">"+val.Country+"</option>";
			});
			$("#contriesSelect").html(text);
		},
		error: function(msg){
			console.table(msg);
		}
	})
}
