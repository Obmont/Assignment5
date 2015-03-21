function MenuChoice()
{
    if (document.getElementById("menu").value== "Show All Customers") 
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        
        //Begins the function to get all the customers.
        
        //Creates AJAX request object.
        var objRequest = new XMLHttpRequest();
        
        //Creates URL and Query String for retrieving all customer names, IDs, and Cities.
        var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
        
        //Checks that the object has returned data.
        objRequest.onreadystatechange = function()
        {
            if (objRequest.readyState == 4 && objRequest.status == 200)
            {
                var output = JSON.parse(objRequest.responseText);
                GenerateCustomerOutput(output);
            }
        }
        
        //Initiates the server request.
        objRequest.open("GET", url, true);
        objRequest.send();
    }
    else if (document.getElementById("menu").value == "Customer Order History")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Customer Orders")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "visible";
    }
    else
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
    }
}

//Function to get order history by looking up customer ID.
function GetOrderHistory()
{
    //Creates AJAX request object.
    var objRequest = new XMLHttpRequest();
    
    //Creates URL and Query String for retrieving all customer names, IDs, and Cities.
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    
    //Adds the input to search with.
    url += document.getElementById("custid1").value;
    
    //Checks that the object has returned data.
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateHistoryOutput(output);
        }
    }
    
    //Initiates the server request.
    objRequest.open("GET", url, true);
    objRequest.send();
}

//Function to get orders by looking up customer ID.
function GetOrders()
{
    //Creates AJAX request object.
    var objRequest = new XMLHttpRequest();
    
    //Creates URL and Query String for retrieving all customer names, IDs, and Cities.
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    
    //Adds the input to search with.
    url += document.getElementById("custid2").value;
    
    //Checks that the object has returned data.
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOrderOutput(output);
        }
    }
    
    //Initiates the server request.
    objRequest.open("GET", url, true);
    objRequest.send();
}

//Used to display customer information.
function GenerateCustomerOutput(result)
{
    var count=0;
    
    var displaytext="<table border=1><tr><th>Customer Name</th><th>Customer ID</th><th>City</th></tr>";
    
    //for loop to extract data from the response object.
    
    for(count=0; count < result.GetAllCustomersResult.length; count++)
    {
        displaytext += "<tr><td>" + result.GetAllCustomersResult[count].CompanyName + "</td><td>" + result.GetAllCustomersResult[count].CustomerID + "</td><td>" + result.GetAllCustomersResult[count].City + "</td></tr>";
    }
    
    displaytext += "</table>";
    
    document.getElementById("customerdisplay").innerHTML=displaytext;
    
    
}

function GenerateHistoryOutput(result)
{
    var count=0;
    
    var displaytext="<table border=1><tr><th>Product Name</th><th>Quantity Ordered</th></tr>";
    
    //for loop to extract data from the response object.
    
    for(count=0; count < result.length; count++)
    {
        displaytext += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";
    }
    
    displaytext += "</table>";
    
    document.getElementById("historydisplay").innerHTML=displaytext;
    
}

function GenerateOrderOutput(result)
{
    var count=0;
    
    var displaytext="<table border=1><tr><th>Order Date</th><th>Order ID</th><th>Shipping Address</th><th>Shipping City</th><th>Shipping Name</th><th>Shipping Postal Code</th><th>Shipping Date</th></tr>";
    
    //for loop to extract data from the response object.
    
    for(count=0; count < result.GetOrdersForCustomerResult.length; count++)
    {
        displaytext += "<tr><td>" + result.GetOrdersForCustomerResult[count].OrderDate + "</td><td>" + result.GetOrdersForCustomerResult[count].OrderID + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipName + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode + "</td><td>" + result.GetOrdersForCustomerResult[count].ShippedDate + "</td></tr>";
    }
    
    displaytext += "</table>";
    
    document.getElementById("orderdisplay").innerHTML=displaytext;
    
}