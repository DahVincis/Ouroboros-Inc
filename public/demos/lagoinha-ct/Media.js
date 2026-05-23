function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

// Function to set Instagram as default tab on page load
function setDefaultTab() {
  document.getElementById("defaultOpen").click();
}

// Call the setDefaultTab function to set Instagram as default
setDefaultTab();
