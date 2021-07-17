
## 使い方
### 導入
以下をHTMLに追加します。

``` html
<script src="https://mao2009.github.io/zipToAddress/zipToAddress.js"></script>
```

フォームを作り、ボタンなどのイベントにzipToAddressを登録します。
zip1, zip2, prefecture, city, streetにはセレクタの文字列
funcには自動入力後に処理したい関数を指定します。
必須はzip1、zip2、prefectureですが郵便番号が一つのフィールドの場合はzip2には""を指定してください。
郵便番号にハイフンが入っていても全角数字でも問題ありません。

``` js
zipToAddress(zip1, zip2, prefecture, city, street, func)
```

### 住所フィールドが1つの場合 

``` html
<div>
    郵便番号:
    <input type="text" name="zip1"></input>　-　
    <input type="text" name="zip2"></input>
</div>
<div>
    住所 :
    <input type="text" id="address"></input>
</div>
<div>
    <button onclick='zipToAddress("[name=zip1]", "[name=zip2]", "#address")'>住所検索</button>
</div>
```
### 住所フィールドが2つの場合 

``` html
<div>
    郵便番号:
    <input type="text" name="zip1"></input>　-　
    <input type="text" name="zip2"></input>
</div>
<div>
    住所 :
    <input type="text" id="pref"></input>
    <input type="text" id="city"></input>
</div>
<div>
    <button onclick='zipToAddress("[name=zip1]", "[name=zip2]", "#pref", "#city")'>住所検索</button>
</div>
```

### 住所フィールドが3つの場合 

``` html
<div>
    郵便番号:
    <input type="text" name="zip1"></input>　-　
    <input type="text" name="zip2"></input>
</div>
<div>
    住所 :
    <input type="text" id="pref"></input>
    <input type="text" id="city"></input>
    <input type="text" id="street"></input>
</div>
<div>
    <button onclick='zipToAddress("[name=zip1]", "[name=zip2]", "#pref", "#street")'>住所検索</button>
</div>
```

### 住所を取得後の処理をする場合

``` html
<div>
    郵便番号:
    <input type="text" name="zip1"></input>　-　
    <input type="text" name="zip2"></input>
</div>
<div>
    <input type="text" id="pref"></input>
    <input type="text" id="city"></input>
    <input type="text" id="street"></input>
</div>
<div>
    住所 :
    <textarea id="massage"></textarea>
</div>
<div>
    <button onclick='zipToAddress("[name=zip1]", "[name=zip2]", "#pref", "#street", sampleFunc)'>住所検索</button>
</div>
<script id="sample_script">
    function sampleFunc(data) {
        const zip = document.querySelector("[name=zip1]").value + "-" +document.querySelector("[name=zip2]").value;
        const massage = document.querySelector("#address");
        const prefecture = data.results[0].address1;
        const city = data.results[0].address2;
        const street = data.results[0].address3;

        massage.value = zip + "\n" + prefecture + city + street;
    }
</script>

```
