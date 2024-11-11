var productName=document.getElementById("productName")
var productPrice=document.getElementById("productPrice")
var productCatagory=document.getElementById("productCatagory")
var productDescription=document.getElementById("productDescription")
var searchInput=document.getElementById("searchInput");

var addInput =document.getElementById("addInput")
var updateInput =document.getElementById("updateInput")

var productContainer=[];

if(localStorage.getItem("myProduct")!==null)
{
    productContainer=JSON.parse(localStorage.getItem("myProduct"))
    displayProduct(productContainer)
}

function addProduct(){
    if(validateForm(productName)&&validateForm(productPrice)&&validateForm(productCatagory)&&validateForm(productDescription)){
        var product ={
            code:productName.value,
            price:productPrice.value,
            catagory:productCatagory.value,
            description:productDescription.value,
        }
    productContainer.push(product)    
    console.log(productContainer);
    localStorage.setItem("myProduct",JSON.stringify(productContainer))
    clearForm()
    displayProduct(productContainer)
    }

    else
    {
        Swal.fire({
            // title: "Please make sure to enter all fields correctly",
            text: "Please make sure to enter all fields correctly",
            icon: "error"
          });
    }
}


function clearForm(){
    productName.value="";
    productPrice.value="";
    productCatagory.value="";
    productDescription.value="";
}

function displayProduct(arr){
    var cartoona=``;
    for(var i=0 ; i<arr.length;i++){
        cartoona+=`<tr>
                <th scope="row">${i+1}</th>
                <td>${arr[i].code}</td>
                <td>${arr[i].price}</td>
                <td>${arr[i].catagory}</td>
                <td>${arr[i].description}</td>
                <td> <button onclick="setFormForUpdate(${i}) " class="btn btn-outline-success btn-sm">Update</button></td>
                <td> <button onclick="deleteProduct(${i}) " class="btn btn-outline-danger btn-sm">Delete</button></td>
              </tr>`
    }
    document.getElementById("tableRow").innerHTML=cartoona;
}


function searchProduct(){
    var serachReslut=[];
    var index=searchInput.value;
    for(var i=0 ; i<productContainer.length ; i++)
    {
        if(productContainer[i].code.toLowerCase().includes(index.toLowerCase()))
        {
            serachReslut.push(productContainer[i])
        }
    }
    displayProduct(serachReslut)
    console.log(serachReslut);
    

}

function deleteProduct(deleteIndex){

    productContainer.splice(deleteIndex,1);
    localStorage.setItem("myProduct",JSON.stringify(productContainer))
displayProduct(productContainer)
}

var x;
function setFormForUpdate(updateIndex){
    x=updateIndex

    productName.value=productContainer[updateIndex].code;
    productPrice.value=productContainer[updateIndex].price;
    productCatagory.value=productContainer[updateIndex].catagory;
    productDescription.value=productContainer[updateIndex].description;

    addInput.classList.add("d-none");
    updateInput.classList.replace("d-none" , "d-block")
}

function updateProduct(){
    productContainer[x].code=productName.value;
    productContainer[x].price=productPrice.value;
    productContainer[x].catagory=productCatagory.value;
    productContainer[x].description=productDescription.value;
    localStorage.setItem("myProduct",JSON.stringify(productContainer))
    displayProduct(productContainer)

    addInput.classList.replace("d-none","d-block");
    updateInput.classList.add("d-none" )
    clearForm()
}


// function validateForm(element){
//     // console.log(element.value , element.id);
    
//     var regex={
//         productName:/^[A-Z][a-z]{2,8}$/,
//         productPrice:/[1-9][0-9][0-9][0-9]/,
//         productCatagory:/[mopiles|laptop]/,
//         productDescription:/.{3}/
//     }

//     if(regex[element.id].test(element.value)==true){
//         console.log("match");
//     }
//     else
// {
//     console.log("not match");
    
// }

// }

function validateForm(element) 
{
var regex={
    productName:/^[A-Z][a-z]{2,8}/,
    productPrice:/[1-9][0-9][0-9][0-9]/,
    productCatagory:/(Mopiles|Laptop|Tv|Screen)/,
    productDescription:/.{3}/
}

    if(regex[element.id].test(element.value)==true)
    {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.replace("d-block","d-none")
        return true  

    }
    else
    {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.replace("d-none","d-block")
        return false
    }
}