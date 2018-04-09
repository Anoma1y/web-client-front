<?php
if (!isset($_GET['_t'])) {
        $_GET['_t'] = time();
        $query = [];
        foreach($_GET as $key => $value) {
                $query[] = $key."=".$value;
        }
        $query = implode("&", $query);
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        header("Location: https://accounts.tokensale.tsrpay.com".$uri."?".$query);
        exit();
}
require('./index.html');