<%--
  Created by IntelliJ IDEA.
  User: NKlaze
  Date: 11/04/2015
  Time: 2:45 PM
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
                <div class="page-header keybase-panel keybase-project-metadata">
                </div>
            </div>
            <div class="col-md-4">
                <form class="form-inline" id="search-in-project">
                    <div class="form-group">
                        <label class="sr-only" for="taxonomicScopeSearch">Search term</label>
                        <div>
                            <input type="text" class="form-control" id="taxonomicScopeSearch" placeholder="Search...">
                            <input type="hidden" id="search-project-id" />
                            <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-search"></span></button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-8">
                <div id="project-tab" class="keybase-panel" role="tabpanel">
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active"><a href="#keys-hierarchical" aria-controls="home" role="tab" data-toggle="tab">Keys (tree)</a></li>
                        <li role="presentation"><a href="#keys-alphabetical" aria-controls="home" role="tab" data-toggle="tab">Keys (alphabetical)</a></li>
                    </ul>

                    <div class="tab-content">
                        <div id="keys-hierarchical" class="tab-pane active" role="tabpanel"></div>
                        <div id="keys-alphabetical" class="tab-pane" role="tabpanel"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
