# vue-shop
 vue로 쇼핑몰 만들기
# 보안이 필요한 구현 부분

- vue 사용법 숙지 필요요
- 
- 

## 디렉토리 구조

```
.
├── .github               # Github setting folder
├── .vscode               # VSCode setting folder
├── .api
├── public                # Public folder
├── src
│   ├── assert
│   │   ├── css
│   │   └── img
│   │       ├── carousel
│   │       ├── favicon
│   │       └── svg
│   ├── components        # all components
│   │   ├── carts
│   │   ├── common
│   │   ├── layout
│   │   └── products
│   ├── constants
│   ├── router
│   ├── store
│   ├── views             # Next JS pages
│   ├── App.vue
│   └── main.js
├── .env
├── .gitattributes
├── .gitignore            # Ignore Git commit
├── index.html
├── package-lock.json     # Same packages with others
├── package.json          # Package information
├── postcss.config.js     # PostCSS setting
├── README.md             # README file
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.json
```

## Cart

## Vercel

### 배포 단계

-

### 배포 주소

- vercel.json은 서버에서 CSR(Client Side Rendering) 시에 라우팅 주소를 알 수 없기 때문에 rewrite로 주소를 루트로 보내어 Client의 Routing 시스템을 사용하도록 유도합니다.
- https://react-shop-five-roan.vercel.app/
