# 通用樣式表

  // Submate自定義線性漸變色 text- bg- border-
  gradient-01:           $gradient-01,
  gradient-02:           $gradient-02,
  gradient-01-reverse:   $gradient-01-reverse,
  gradient-02-reverse:   $gradient-02-reverse,
  gradient-dyn-01:       $gradient-dyn-01, /* 推薦給短字、小按鈕 */
  gradient-dyn-02:       $gradient-dyn-02,
  /*垂直版*/
  gradient-01-vertical:           $gradient-01-vertical,
  gradient-02-vertical:           $gradient-02-vertical,
  gradient-01-vertical-reverse:   $gradient-01-vertical-reverse,
  gradient-02-vertical-reverse:   $gradient-02-vertical-reverse,
  gradient-dyn-01-vertical:       $gradient-dyn-01-vertical,
  gradient-dyn-02-vertical:       $gradient-dyn-02-vertical,
  /* 左下(#9738F5) → 中(#11A7ED) → 右上(#1EDFAD) */
  gradient-01-bltr: $gradient-01-bltr
  
  //submate放置自定義的顏色樣式 primary secondary neutral
  "primary-50": $primary-50,
  "primary-100": $primary-100,
  "primary-200": $primary-200,
  "primary-300": $primary-300,
  "primary-400": $primary-400,
  "primary-500": $primary-500,
  "primary-600": $primary-600,
  "primary-700": $primary-700,
  "primary-800": $primary-800,
  "primary-900": $primary-900,
  "primary-950": $primary-950,

  "secondary-50": $secondary-50,
  "secondary-100": $secondary-100,
  "secondary-200": $secondary-200,
  "secondary-300": $secondary-300,
  "secondary-400": $secondary-400,
  "secondary-500": $secondary-500,
  "secondary-600": $secondary-600,
  "secondary-700": $secondary-700,
  "secondary-800": $secondary-800,
  "secondary-900": $secondary-900,
  "secondary-950": $secondary-950,

  "neutral-0": $neutral-0,
  "neutral-50": $neutral-50,
  "neutral-100": $neutral-100,
  "neutral-200": $neutral-200,
  "neutral-300": $neutral-300,
  "neutral-400": $neutral-400,
  "neutral-500": $neutral-500,
  "neutral-600": $neutral-600,
  "neutral-700": $neutral-700,
  "neutral-800": $neutral-800,
  "neutral-900": $neutral-900,
  "neutral-950": $neutral-950,

  // submate自訂color
  $primary: $primary-600;
  $secondary: $secondary-500;
  $black: $neutral-950;
  $dark: $black;
  $white:#FFFFFF;
  $light: $white;
  // submate自訂body-color  -> black

  // submate自訂距離(間距)0~13
  0: 0,
  1: $spacer * .25, // 4px
  2: $spacer * .5, // 8px
  3: $spacer * .75, // 12px
  4: $spacer, 
  5: $spacer * 1.25, // 20px
  6: $spacer * 1.5, // 24px
  7: $spacer * 1.75, // 28px
  8: $spacer * 2, // 32px
  9: $spacer * 2.25, // 36px
  10: $spacer * 2.5, // 40px
  11: $spacer * 2.75, // 44px
  12: $spacer * 3, // 48px
  13: $spacer * 5, // 80px

  // submate自訂改成不啟用預定義的 border-radius 樣式
  // submate自訂通用陰影有開啟
  // submate預設縮放調整引擎可響應式的縮放大小通用(font-size)
  // submate自訂無下底線(link)
  // submate清除預設段落底部margin-bootom
  // submate修改清除預設標題元素標籤下方空間margin-bottom

  // submate自訂圓 rounded-
      "rounded": (
      property: border-radius,
      class: rounded,
      values: (
        null: var(--#{$prefix}border-radius),
        0: 0,
        1: var(--#{$prefix}border-radius-sm),
        2: var(--#{$prefix}border-radius),
        3: var(--#{$prefix}border-radius-lg),
        4: var(--#{$prefix}border-radius-xl),
        5: var(--#{$prefix}border-radius-xxl),
        circle: 50%,
        pill: var(--#{$prefix}border-radius-pill)
      )
    ),
  $border-radius:               1rem !default; // submate自訂圓角16px
  $border-radius-lg:            1.5rem !default; // submate自訂圓角24px
  $border-radius-xl:            6.25rem !default; // submate自訂圓角100px

  // submate自訂box陰影
  $box-shadow:                  0 0 1rem rgba(#000000, .12) !default;  // submate自訂box陰影
  $card-box-shadow:                   0 0 1rem rgba(#000000, .12) !default; // submate自訂卡片陰影 同box-shadow

  // 字重沒改參考預設 ex. fw-bold
  $font-weight-lighter:         lighter !default;
  $font-weight-light:           300 !default;
  $font-weight-normal:          400 !default;
  $font-weight-medium:          500 !default;
  $font-weight-semibold:        600 !default;
  $font-weight-bold:            700 !default;
  $font-weight-bolder:          bolder !default;

  $table-th-font-weight:        500 !default; //submate自訂表頭(表格標題)字重500

  //submate自訂font-size
  // $是 scss定義變數方式 16px=1rem
  $h1-font-size:                $font-size-base * 2.5 !default; // 40px
  $h2-font-size:                $font-size-base * 2 !default; // 32px
  $h3-font-size:                $font-size-base * 1.75 !default; // 28px
  $h4-font-size:                $font-size-base * 1.5 !default; // 24px
  $h5-font-size:                $font-size-base * 1.25 !default; // 20px
  $h6-font-size:                $font-size-base !default; // 16px
  $h7-font-size:                $font-size-base * 0.875 !default; // 14px

  ex. fs-
  1: $h1-font-size,
  2: $h2-font-size,
  3: $h3-font-size,
  4: $h4-font-size,
  5: $h5-font-size,
  6: $h6-font-size,
  7: $h7-font-size, // 自訂 新增14px

  rwd 在class裡寫 md可以換 sm: 576px,  md: 768px, lg: 992px,  xl: 1200px,  xxl: 1400px
  h1-md // 40xp
  h2-md // 32xp
  h3-md // 28xp
  h4-md // 24xp
  h5-md // 20xp
  h6-md // 16xp
  h7-md // 14xp

 

 

