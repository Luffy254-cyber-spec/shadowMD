document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pairing-form');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.loader');
    const resultDiv = document.getElementById('result');
    const codeText = document.getElementById('codeText');
    const copyBtn = document.getElementById('copyBtn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const phoneNumber = document.getElementById('phoneNumber').value.trim();

        if (!phoneNumber) return;

        // UI Loading State
        setLoading(true);
        resultDiv.hidden = true;

        try {
            const response = await fetch('/pair', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phoneNumber })
            });

            const data = await response.json();

            if (response.ok) {
                // Success
                codeText.textContent = data.code;
                resultDiv.hidden = false;
            } else {
                alert('Error: ' + (data.error || 'Failed to get code'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeText.textContent)
            .then(() => {
                const originalIcon = copyBtn.innerHTML;
                copyBtn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" stroke="lime" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                setTimeout(() => {
                    copyBtn.innerHTML = originalIcon;
                }, 2000);
            });
    });

    function setLoading(isLoading) {
        submitBtn.disabled = isLoading;
        if (isLoading) {
            btnText.hidden = true;
            loader.hidden = false;
        } else {
            btnText.hidden = false;
            loader.hidden = true;
        }
    }
});
