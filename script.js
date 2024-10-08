// THI 질문 데이터 정의
const questions = [
    { question: "1. 귀의 소리가 당신의 일상생활에 불편을 줍니까?" },
    { question: "2. 이명으로 인해 화가 나십니까?" },
    { question: "3. 이명으로 인해 당신의 사회생활이 제한받습니까?" },
    { question: "4. 당신은 이명 때문에 집중하기가 어렵습니까?" },
    { question: "5. 이명으로 인해 종종 절망감을 느끼십니까?" },
    { question: "6. 이명 때문에 밤에 잠들기 어렵습니까?" },
    { question: "7. 이명으로 인해 좌절감을 느끼십니까?" },
    { question: "8. 이명 때문에 소음에 민감해지셨습니까?" },
    { question: "9. 이명 때문에 긴장감을 느끼십니까?" },
    { question: "10. 이명으로 인해 일을 잘 못합니까?" },
    { question: "11. 이명으로 인해 화를 잘 내거나 신경질적으로 변했습니까?" },
    { question: "12. 이명이 당신의 사회적 관계를 방해합니까?" },
    { question: "13. 이명으로 인해 우울감을 느끼십니까?" },
    { question: "14. 이명 때문에 어지럼증을 느끼십니까?" },
    { question: "15. 이명으로 인해 불안감을 느끼십니까?" },
    { question: "16. 이명 때문에 실망감을 느끼십니까?" },
    { question: "17. 이명으로 인해 자신감이 없어졌습니까?" },
    { question: "18. 이명 때문에 실직이나 일에 어려움을 겪었습니까?" },
    { question: "19. 이명으로 인해 가족 관계에 영향을 받았습니까?" },
    { question: "20. 이명으로 인해 짜증이 나십니까?" },
    { question: "21. 이명 때문에 생활이 즐겁지 않습니까?" },
    { question: "22. 이명으로 인해 집중이 잘 안 됩니까?" },
    { question: "23. 이명 때문에 항상 의식을 하십니까?" },
    { question: "24. 이명이 지속적으로 당신을 괴롭힙니까?" },
    { question: "25. 이명 때문에 불쾌감을 느끼십니까?" }
];

// 답변 옵션
const options = [
    { text: "예", value: 4 },
    { text: "때때로", value: 2 },
    { text: "아니오", value: 0 }
];

let currentQuestionIndex = 0;
let responses = [];
let totalScore = 0;  // 점수 총합을 저장할 변수

// 설문지를 동적으로 생성하는 함수
function generateSurvey() {
    const surveyContainer = $('#surveyContainer');

    questions.forEach((q, index) => {
        const questionDiv = $(`
            <div class="question-container" id="question-${index}">
                <div class="question-number">질문 ${index + 1} / ${questions.length}</div>
                <h5>${q.question}</h5>
            </div>
        `);

        options.forEach(option => {
            const button = $(`
                <button class="btn btn-primary option-button" data-value="${option.value}">
                    ${option.text}
                </button>
            `);
            button.on('click', () => handleOptionClick(option.value, index));
            questionDiv.append(button);
        });

        surveyContainer.append(questionDiv);
    });

    // 첫 번째 질문을 표시
    $(`#question-${currentQuestionIndex}`).addClass('active-question');
}

// 옵션 클릭 시 처리
function handleOptionClick(value, index) {
    responses[index] = parseInt(value);
    totalScore += parseInt(value);  // 선택된 값만큼 총점에 추가

    // 현재 질문을 숨기고 다음 질문을 표시
    $(`#question-${currentQuestionIndex}`).removeClass('active-question');
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        $(`#question-${currentQuestionIndex}`).addClass('active-question');
    } else {
        // 모든 질문이 끝났으면 결과 표시
        showResult();
    }
}

// 3진법으로 변환하는 함수
function convertToBase3() {
    return responses.map(r => {
        if (r === 4) return 2;
        if (r === 2) return 1;
        return 0;
    }).join('');
}

// 3진법 문자열을 10진법으로 변환
function base3ToDecimal(base3String) {
    return parseInt(base3String, 3);
}

// 10진법을 다시 3진법으로 변환하는 함수
function decimalToBase3(decimal) {
    return decimal.toString(3).padStart(questions.length, '0');
}

// 3진법을 원래 선택지로 복원하는 함수
function restoreResponsesFromBase3(base3String) {
    responses = base3String.split('').map(digit => {
        if (digit === '2') return 4;
        if (digit === '1') return 2;
        return 0;
    });

    // 복원된 응답을 화면에 표시하거나 처리 가능
}

// 결과를 표시하는 함수
function showResult() {
    $('#surveyContainer').hide();

    // 3진법으로 변환하고 10진법으로 요약
    const base3String = convertToBase3();
    const decimalResult = base3ToDecimal(base3String);

    // 결과 표시 (총합과 요약 코드 함께 출력)
    $('#result').html(`
        설문지 요약 코드: ${decimalResult}<br>
        점수 총합: ${totalScore}점
    `);
}

// 요약 코드를 입력 받아 복원하는 예시
function restoreSurvey(decimalCode) {
    const base3String = decimalToBase3(decimalCode);
    restoreResponsesFromBase3(base3String);

    // 복원된 데이터를 가지고 어떤 작업을 할 수 있음
    console.log('복원된 응답:', responses);
}

// 페이지 로드 시 설문지를 동적으로 생성
$(document).ready(() => {
    generateSurvey();
});
