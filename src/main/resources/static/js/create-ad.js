const LINE_DELIMITER = document.createElement('br')

const title = document.querySelector('input[name="title"]');

const typeSelector = document.querySelector('select[name="type"]');
const addTextBtn = document.querySelector('#add-adv-text')
const addImageBtn = document.querySelector('#add-adv-image')

const addVideoBtn = document.querySelector('#add-adv-video')

const dropElements = document.querySelector('#drop-adv-elements')

const componentToObjectMapping = {
    'youtube-video': (el) => {
        return {
            type: 'youtube_video',
            videoLink: el.value
        }
    },
    'text': (el) => {
        return {
            type: 'rich_text',
            text: el.value
        }
    },
    'image': (el) => {
        return {
            type: 'image',
            src: `/media/images/${APP.userId}/${el.value}`
        }
    }
};

document.querySelector('#adv-submit').onclick = function (event) {
    event.preventDefault();
    let url = "/profile/create-ad";
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title.value,
            type: typeSelector.value,
            elements: collectDropElements()
        })
    }).then(response => {
        if (response.ok && response.status === 201) {
            window.location = `${response.headers.get('Location')}.html`;
        }
    });
}

addTextBtn.onclick = function () {
    let textArea = document.createElement('textarea');
    textArea.placeholder = 'Введите текст';
    textArea.setAttribute('adv-type', 'text')
    dropElements.appendChild(textArea);
    dropElements.appendChild(LINE_DELIMITER);
};

addImageBtn.onclick = function () {
    let imgInput = document.createElement('input');
    imgInput.type = 'text'
    imgInput.setAttribute('adv-type', 'image')
    dropElements.appendChild(imgInput);
    dropElements.appendChild(LINE_DELIMITER);
};

addVideoBtn.onclick = function () {
    let videoInput = document.createElement('input');
    videoInput.type = 'text'
    videoInput.placeholder = 'Ссылка на видео на YouTube'
    videoInput.setAttribute('adv-type', 'youtube-video')
    dropElements.appendChild(videoInput);
    dropElements.appendChild(LINE_DELIMITER);
};

function collectDropElements() {
    let elements = [];
    if (dropElements.hasChildNodes()) {
        let children = dropElements.children;
        for (let i = 0; i < children.length; i++) {
            let dropComponent = children[i];
            let adType = dropComponent.getAttribute('adv-type');

            let map = componentToObjectMapping[adType];
            if (map) {
                elements.push(map(dropComponent));
            }
        }
    }
    return elements;
}