window.onload = function () {
    const sidebarfiles_elem = document.getElementById("sidebar-files");

    axios.get("/viewer/getFiles.php")
        .then(response => {
            for (file of response.data.files) {
                const a = document.createElement("a");
                a.classList.add("file-link");
                a.href = "#";
                a.dataset.file = file;
                a.innerHTML = file;
                a.onclick = function () {
                    openFile(a);
                }
                const li = document.createElement("li");
                li.appendChild(a);
                sidebarfiles_elem.appendChild(li);
            }
            if (document.getElementsByClassName("file-link")[0] != undefined) {
                openFile(document.getElementsByClassName("file-link")[0]);
            }
        })
        .catch(error => {
            alert("Error: " + error.message);
            console.error(error);
        });
}

function openFile(that) {
    const converter = new showdown.Converter();
    converter.setFlavor("github");
    axios.get("/files/" + that.dataset.file, {
            responseType: "text"
        })
        .then(response => {
            const html = converter.makeHtml(response.data);
            document.getElementById("main").innerHTML = html;
        })
        .catch(error => {
            alert("Error: " + error.message);
            console.error(error);
        });
}