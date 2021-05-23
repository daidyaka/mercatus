class Network {

    sendForm(url, req, event, successAction, failAction) {
        if (event) {
            event.preventDefault();
        }

        document.querySelectorAll('.is-invalid').forEach(invalidField => {
            invalidField.classList.remove('is-invalid');
            let feedbackNode = invalidField.parentNode.querySelector('.invalid-feedback');
            feedbackNode.remove();
        });

        fetch(url, req).then(response => {
            if (response.ok) {
                successAction(response);
                return response;
            } else if (failAction) {
                failAction(response);
                return response;
            }

            if (response.status === 400) {
                response.json().then(res => {
                    console.log(res.message)

                    for (const [key, value] of Object.entries(res.errors)) {
                        let element = document.querySelector(`[name="${key}"]`);
                        if (element) {
                            let feedback = document.createElement('div');
                            element.classList.add('is-invalid');
                            feedback.classList.add('invalid-feedback');
                            feedback.textContent = value;
                            element.parentNode.append(feedback)
                        }
                    }
                });
            }

            if (response.status === 403) {
                location.href = '/403'
            }
        })
    }

}

const network = new Network();
export default network;