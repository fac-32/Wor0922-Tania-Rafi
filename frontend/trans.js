
window.addEventListener('load', function() {

    let translateBtn = document.getElementById("tl-btn");
    translateBtn.addEventListener('click', async () => {
        let text = document.getElementById('user-input').value;
        let target = 'es';
        let response = await fetch('/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, target }),
        })
        let returnText = await response.text();
        document.getElementById('translated-text').textContent = returnText;
        })

});
