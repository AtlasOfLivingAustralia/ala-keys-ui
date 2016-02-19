<%--
  Created by IntelliJ IDEA.
  User: NKlaze
  Date: 12/04/2015
  Time: 9:09 PM
--%>

<html>
<head>
    <title>KeyBase</title>
    <meta name="layout" content="keybase"/>
</head>
<body>
    <div class="keybase-container">
        <div class="row">
            <div class="col-md-12">
                <div class="page-header keybase-panel keybase-key-metadata">
                    <div class="keybase-key-title"></div>
                    <div class="keybase-key-source"></div>
                </div>

                <div role="tabpanel">

                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active"><a href="#tab_player" aria-controls="player" role="tab" data-toggle="tab">Interactive key</a></li>
                        <li role="presentation"><a href="#tab_bracketed" aria-controls="bracketed" role="tab" data-toggle="tab">Bracketed key</a></li>
                        <li role="presentation"><a href="#tab_indented" aria-controls="indented" role="tab" data-toggle="tab">Indented key</a></li>
                        <li role="presentation"><a href="#tab_about" aria-controls="about" role="tab" data-toggle="tab">About</a></li>
                    </ul>

                    <!-- Tab panes -->
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="tab_player">
                            <div id="keybase-player" class="keybase-panel"></div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="tab_bracketed">
                            <div id="keybase-bracketed" class="keybase-panel"></div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="tab_indented">
                            <div id="keybase-indented" class="keybase-panel"></div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="tab_about"></div>
                    </div> <!-- /.tab-content -->

                </div> <!-- /role:tabpanel -->

            </div>

        </div>
    </div>
</body>
</html>
