document.addEventListener("DOMContentLoaded", function () {
    // This is the API key of the database

    const APIKEY = "65c21b9d40097aa2f0c8b547";

    // Activating the function to get the data

    getSaveScore();

    // This part activates when the user clicks the save button to save their score

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

                // Activating the function to get the data

                getSaveScore();

                // Activating the function to alert the user that they have submitted their score to the database

                submitScore();

                // Reset the entire page after submitting

                document.getElementById("update-score-form").reset();
            });
    })
    
    // Function to get the data

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

                // This is to sort the data to ensure the person with the highest score is at the top

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

    // Function to alert the user that they have submitted their score to the database

    function submitScore() {
        alert('You have saved your score!');
    }
});