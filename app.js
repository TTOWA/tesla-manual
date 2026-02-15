const manualData = {
  "Model 3": {
    years: ["2024", "2023"],
    description: "가장 대중적인 세단. 충전/주행 보조/디스플레이 중심으로 자주 문의됩니다.",
    categories: {
      기본조작: [
        { title: "스마트키 없이 문 열기", body: "Tesla 앱 블루투스를 켜고 차량 근처에서 도어 핸들을 누르면 자동 잠금 해제됩니다." },
        { title: "원터치 와이퍼 설정", body: "와이퍼 레버 버튼 클릭 후 디스플레이에서 Auto/수동 속도를 선택합니다." }
      ],
      충전: [
        { title: "슈퍼차저 사용 순서", body: "차량 주차 → 포트 열기 → 커넥터 연결. 결제는 Tesla 계정에 등록된 카드로 자동 처리됩니다." },
        { title: "배터리 수명 관리", body: "일상 사용은 80~90% 충전 제한을 권장하며 장거리 이동 전 100% 설정이 좋습니다." }
      ],
      문제해결: [
        { title: "카메라 시야 가림 경고", body: "렌즈 오염 여부를 확인하고 성에 제거 후 재시도하세요. 반복되면 서비스 모드 점검이 필요합니다." }
      ]
    }
  },
  "Model Y": {
    years: ["2025", "2024"],
    description: "패밀리 SUV. 적재/실내공간과 공조, 장거리 충전 계획 문의가 많습니다.",
    categories: {
      기본조작: [
        { title: "2열 폴딩", body: "트렁크 좌측 레버 또는 2열 버튼으로 시트를 평평하게 접어 적재 공간을 확장합니다." }
      ],
      공조: [
        { title: "캠프 모드", body: "주차 상태에서 공조 메뉴 > 캠프 모드를 켜면 실내 온도와 전원을 유지합니다." }
      ],
      충전: [
        { title: "겨울철 급속 충전 최적화", body: "네비 목적지를 슈퍼차저로 지정하면 배터리 프리컨디셔닝이 자동 시작됩니다." }
      ]
    }
  },
  "Model S": {
    years: ["2023", "2022"],
    description: "고성능/장거리 세단. 서스펜션, 퍼포먼스 설정 관련 항목이 핵심입니다.",
    categories: {
      주행: [
        { title: "서스펜션 높이 설정", body: "서스펜션 메뉴에서 위치 기반 높이 저장을 사용해 구간별 자동 높이 조절이 가능합니다." }
      ],
      안전: [
        { title: "긴급 제동 보조", body: "전방 충돌 위험 시 시각/청각 경고 후 자동 감속합니다. 설정 메뉴에서 감도 조절이 가능합니다." }
      ]
    }
  },
  "Model X": {
    years: ["2023", "2021"],
    description: "팔콘윙 도어와 3열 공간이 특징. 도어 높이 제한 설정이 중요합니다.",
    categories: {
      도어: [
        { title: "팔콘윙 도어 높이 제한", body: "도어를 원하는 높이까지 연 뒤 버튼을 길게 눌러 해당 위치를 기본값으로 저장합니다." }
      ],
      적재: [
        { title: "프렁크 안전 닫기", body: "프렁크는 양손으로 균일하게 눌러 닫고 손가락 끼임을 주의해야 합니다." }
      ]
    }
  },
  Cybertruck: {
    years: ["2025"],
    description: "차체/적재/오프로드 설정이 중심인 신형 라인업입니다.",
    categories: {
      오프로드: [
        { title: "오프로드 모드", body: "주행 모드에서 Off-road를 선택하면 트랙션 제어와 차고가 지형에 맞게 조정됩니다." }
      ],
      적재: [
        { title: "볼트 전원 사용", body: "베드 전원 포트는 디스플레이 전원 메뉴에서 켜고, 최대 출력 한도를 확인하세요." }
      ]
    }
  }
};

const modelSelect = document.getElementById("modelSelect");
const yearSelect = document.getElementById("yearSelect");
const searchInput = document.getElementById("searchInput");
const quickTags = document.getElementById("quickTags");
const modelTitle = document.getElementById("modelTitle");
const modelDesc = document.getElementById("modelDesc");
const categoryWrap = document.getElementById("categoryWrap");
const manualContent = document.getElementById("manualContent");

let selectedModel = Object.keys(manualData)[0];
let selectedCategory = null;

function renderModelOptions() {
  modelSelect.innerHTML = Object.keys(manualData)
    .map((model) => `<option value="${model}">${model}</option>`)
    .join("");
}

function renderYearOptions(model) {
  yearSelect.innerHTML = manualData[model].years
    .map((year) => `<option value="${year}">${year}년</option>`)
    .join("");
}

function renderQuickTags(categories) {
  quickTags.innerHTML = categories
    .map((c) => `<button class="tag" data-tag="${c}">#${c}</button>`)
    .join("");

  quickTags.querySelectorAll(".tag").forEach((tagBtn) => {
    tagBtn.addEventListener("click", () => {
      selectedCategory = tagBtn.dataset.tag;
      renderContent();
    });
  });
}

function renderCategories(categories) {
  categoryWrap.innerHTML = categories
    .map((c) => `<button class="category-btn ${selectedCategory === c ? "active" : ""}" data-category="${c}">${c}</button>`)
    .join("");

  categoryWrap.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedCategory = btn.dataset.category;
      renderContent();
    });
  });
}

function renderManualItems(items) {
  if (!items.length) {
    manualContent.innerHTML = "<p>검색 결과가 없습니다. 다른 키워드를 입력해보세요.</p>";
    return;
  }

  manualContent.innerHTML = items
    .map((item) => `<div class="manual-item"><h3>${item.title}</h3><p>${item.body}</p></div>`)
    .join("");
}

function renderContent() {
  const modelInfo = manualData[selectedModel];
  const categories = Object.keys(modelInfo.categories);
  const keyword = searchInput.value.trim().toLowerCase();

  if (!selectedCategory || !categories.includes(selectedCategory)) {
    selectedCategory = categories[0];
  }

  modelTitle.textContent = `${selectedModel} 메뉴얼`;
  modelDesc.textContent = `${yearSelect.value}년 기준 · ${modelInfo.description}`;

  renderCategories(categories);
  renderQuickTags(categories);

  const allItems = selectedCategory
    ? modelInfo.categories[selectedCategory]
    : categories.flatMap((c) => modelInfo.categories[c]);

  const filtered = keyword
    ? allItems.filter((item) => `${item.title} ${item.body}`.toLowerCase().includes(keyword))
    : allItems;

  renderManualItems(filtered);

  quickTags.querySelectorAll(".tag").forEach((tag) => {
    tag.classList.toggle("active", tag.dataset.tag === selectedCategory);
  });
}

modelSelect.addEventListener("change", (event) => {
  selectedModel = event.target.value;
  selectedCategory = null;
  renderYearOptions(selectedModel);
  renderContent();
});

yearSelect.addEventListener("change", renderContent);
searchInput.addEventListener("input", renderContent);

renderModelOptions();
renderYearOptions(selectedModel);
renderContent();
