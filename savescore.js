document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65c21b9d40097aa2f0c8b547";
    getSaveScore();
    document.getElementById("saveScoreBtn").addEventListener("click", function (e) {
        e.preventDefault();

        let username = document.getElementById("username").value;
        let score = document.getElementById("pointscored").value;

        let jsondata = {
            "username": username,
            "score": score
        };

        let settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsondata),
            beforeSend: function () {
                document.getElementById("saveScoreBtn").disabled = true;
            }
        }

        fetch("https://fedassignment2-8ffd.restdb.io/rest/userinformation", settings)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                document.getElementById("saveScoreBtn").disabled = false;
                getSaveScore();
                submitScore();
                document.getElementById("update-score-form").reset();
            });
    })

    function getSaveScore(all = true) {
        let settings = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
        }

        fetch("https://fedassignment2-8ffd.restdb.io/rest/userinformation", settings)
            .then(response => response.json())
            .then(response => {
                response.sort((a, b) => b.score - a.score);
                let content = "";

                for (var i = 0; i< response.length; i++) {
                    content = `${content}<tr id='${response[i]._id}'>
                    <td>${response[i].username}</td>
                    <td>${response[i].score}</td></tr>`;
                }

                document.getElementById("leaderboard-list").getElementsByTagName("tbody")[0].innerHTML = content;
            });
    }

    function submitScore() {
        alert('You have saved your score!');
    }
});