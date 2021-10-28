const search = document.querySelector("input");
const celebrates = document.querySelectorAll(".card");

search.addEventListener('keyup', function(event) {
    let userWritten = event.target.value.toLowerCase();
    celebrates.forEach(celebrate =>{
        if (celebrate.querySelector(".card-title").textContent.toLowerCase().includes(userWritten) === false) {
            celebrate.style.display = "none";
        }
        else {
            celebrate.style.display = "flex";
        }
    }
        )
})
