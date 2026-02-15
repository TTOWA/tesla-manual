# Tesla Manual Hub (MVP)

차량별(모델/연식) 메뉴얼을 빠르게 조회할 수 있는 정적 웹 MVP입니다.

## 실행

```bash
python3 -m http.server 4173
```

브라우저에서 `http://localhost:4173` 접속.

## 포함 기능

- 모델 선택 (Model 3/Y/S/X/Cybertruck)
- 연식 선택
- 카테고리 기반 메뉴얼 조회
- 키워드 검색

## 다음 단계

- 실제 PDF 메뉴얼 파싱 후 데이터 자동 생성
- 출처(문서명/페이지) 링크 표시
- 다국어(i18n) 확장
