# Cafe24 스킨 개발 컨텍스트 가이드

> 이 문서는 새로운 AI 세션에서 빠르게 Cafe24 스킨 개발 컨텍스트를 이해시키기 위한 요약 가이드입니다.

---

## 1. Cafe24 스킨이란?

Cafe24는 한국의 대표적인 이커머스 플랫폼으로, **스킨(Skin)**은 쇼핑몰의 프론트엔드 디자인 템플릿입니다.
일반 HTML/CSS와 달리 **Cafe24 전용 문법(치환코드, 모듈)**을 사용합니다.

---

## 2. 핵심 특수 문법 (5가지)

```html
<!--@import(파일경로)-->     <!-- 파일 삽입 (HTML 조각) -->
<!--@css(CSS파일경로)-->      <!-- CSS 파일 삽입 -->
<!--@js(JS파일경로)-->        <!-- JS 파일 삽입 -->
<!--@layout(레이아웃경로)-->   <!-- 페이지 레이아웃 지정 -->
<!--@contents-->              <!-- 레이아웃에서 컨텐츠 삽입 위치 -->
```

**중요**: 모든 경로는 **절대경로**(`/`로 시작) 사용 필수!

---

## 3. 치환코드(변수) 사용법

```html
{$변수명}                    <!-- 일반 출력 -->
{$변수명|display}            <!-- 값 있을 때만 해당 요소 표시 -->
{$변수명|numberformat}       <!-- 숫자 포맷팅 (1000 → 1,000) -->
```

### 자주 사용하는 치환코드

| 분류 | 치환코드 | 설명 |
|------|---------|------|
| **상품** | `{$product_name}` | 상품명 |
| | `{$product_no}` | 상품번호 |
| | `{$disp_product_price}` | 판매가 |
| | `{$image_medium}` | 중간 이미지 |
| | `{$image_big}` | 큰 이미지 |
| | `{$link_product_detail}` | 상품 상세 링크 |
| | `{$param}` | 상품 파라미터 |
| **아이콘** | `{$soldout_icon}` | 품절 아이콘 |
| | `{$new_icon}` | NEW 아이콘 |
| | `{$recommend_icon}` | 추천 아이콘 |
| **회원** | `{$member_id}` | 회원 ID |
| | `{$mileage}` | 마일리지 |
| | `{$basket_cnt}` | 장바구니 수량 |
| **쇼핑몰** | `{$mall_name}` | 쇼핑몰명 |
| | `{$company_name}` | 회사명 |

---

## 4. 모듈(Module) 시스템

모듈은 **데이터를 자동으로 반복 출력**하는 Cafe24의 핵심 기능입니다.

### 모듈 기본 구조

```html
<div module="모듈아이디">
    <!--@css(/css/module/경로.css)-->
    <!--
        $count = 8
        $basket_result = /product/add_basket.html
        $moreview = yes
    -->
    <ul>
        <li>{$product_name}</li>  <!-- 이 부분이 자동 반복됨 -->
    </ul>
</div>
```

### 주요 모듈 종류

| 모듈 | 용도 |
|------|------|
| `product_listmain_N` | 메인 상품 진열 (N은 숫자) |
| `product_list` | 상품 목록 페이지 |
| `product_detail` | 상품 상세 페이지 |
| `product_ListItem` | 상품 정보 항목 (서브모듈) |
| `product_Option` | 옵션 선택 (서브모듈) |
| `product_Paging` | 페이지네이션 (서브모듈) |
| `Order_basket` | 장바구니 |
| `Layout_stateLogon` | 로그인 상태에서만 표시 |
| `Layout_statelogoff` | 로그아웃 상태에서만 표시 |
| `Layout_category` | 카테고리 메뉴 |
| `Layout_footer` | 푸터 정보 |

### 모듈 주석 설정

```html
<!-- $count = 8 -->                                    <!-- 표시 개수 -->
<!-- $moreview = yes -->                               <!-- 더보기 버튼 -->
<!-- $basket_result = /product/add_basket.html -->     <!-- 장바구니 결과 페이지 -->
<!-- $cache = yes -->                                  <!-- 캐시 사용 -->
```

---

## 5. 프로젝트 파일 구조

```
/
├── index.html                    # 메인 페이지
├── layout/basic/                 # 레이아웃 폴더
│   ├── layout.html              # 기본 레이아웃 프레임
│   ├── main.html                # 메인용 레이아웃
│   ├── header.html              # 헤더
│   └── footer.html              # 푸터
├── product/                      # 상품 페이지
│   ├── list.html                # 상품 목록
│   ├── detail.html              # 상품 상세
│   └── search.html              # 검색
├── order/                        # 주문 페이지
│   └── basket.html              # 장바구니
├── member/                       # 회원 페이지
│   ├── login.html               # 로그인
│   └── join.html                # 회원가입
├── myshop/                       # 마이페이지
├── css/module/                   # 모듈별 CSS
└── js/module/                    # 모듈별 JS
```

---

## 6. 실전 코드 패턴

### 메인 상품 진열

```html
<div module="product_listmain_1" class="ec-base-product">
    <!-- $count = 8 -->
    <ul class="prdList grid4">
        <li id="anchorBoxId_{$product_no}">
            <a href="{$link_product_detail}">
                <img src="{$image_medium}" alt="{$seo_alt_tag}">
            </a>
            <p class="name">{$product_name}</p>
            <span class="price">{$disp_product_price}</span>
            <div class="icons">
                {$soldout_icon}
                {$new_icon}
            </div>
        </li>
    </ul>
</div>
```

### 조건부 표시

```html
<!-- 품절일 때만 표시 -->
<span class="{$soldout_icon|display}">품절</span>

<!-- 할인가 있을 때만 표시 -->
<del class="{$product_price_ref_display|display}">
    {$txt_product_price_ref}
</del>
```

### 로그인 상태별 표시

```html
<!-- 로그아웃 상태 -->
<a module="Layout_statelogoff" href="/member/login.html">로그인</a>

<!-- 로그인 상태 -->
<a module="Layout_stateLogon" href="{$action_logout}">로그아웃</a>
```

---

## 7. 주의사항

1. **경로는 항상 절대경로** (`/`로 시작)
2. **치환코드 대소문자 구분** (`{$Mall_Name}` ❌ → `{$mall_name}` ✅)
3. **모듈 주석은 모듈 선언 직후**에 작성
4. **관리자에서 모듈 활성화** 필요 (HTML만 있어도 작동 안 함)
5. **product_listmain_N의 N은 자동 생성**됨

---

## 8. 새 세션에서 빠른 시작 프롬프트

새로운 세션에서 아래 내용을 복사해서 사용하세요:

```
이 프로젝트는 Cafe24 쇼핑몰 스킨입니다.

핵심 문법:
- <!--@import(경로)--> : HTML 파일 삽입
- <!--@css(경로)--> : CSS 삽입
- <!--@layout(경로)--> : 레이아웃 지정
- {$변수명} : 치환코드 (상품정보, 회원정보 등 동적 데이터)
- module="모듈ID" : 데이터 자동 반복 출력

주요 모듈:
- product_listmain_N : 메인 상품 진열
- product_list : 상품 목록
- product_detail : 상품 상세
- Layout_stateLogon/Logoff : 로그인 상태별 표시

파일구조:
- /layout/basic/ : 레이아웃 (header, footer, layout.html)
- /product/ : 상품 페이지 (list.html, detail.html)
- /css/module/, /js/module/ : 모듈별 CSS/JS

자세한 내용은 CAFE24_SKIN_GUIDE.md 참고
```

---

## 9. 참고 문서

- 프로젝트 내 PDF: `Cafe24 스킨 제작 완전 가이드 (대량 생산용)_2025.12.17의 사본.pdf`
- [Cafe24 스마트디자인 서포트](https://design.cafe24.com)
- [Cafe24 Help Center](https://helpcenter.cafe24.com)
