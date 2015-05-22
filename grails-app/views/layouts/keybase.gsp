<%--
  Created by IntelliJ IDEA.
  User: NKlaze
  Date: 7/04/2015
  Time: 5:41 PM
--%>

<g:applyLayout name="main">
<head>
    <link href="/keybase/css/dynatree/skin-vista/ui.dynatree.css" rel="stylesheet" />
    <link href="/keybase/css/main.css" rel="stylesheet" />
    <link href="/keybase/css/keybase.dynatree.css" rel="stylesheet" />
    <link href="/keybase/css/keybase.player.css" rel="stylesheet" />

    <script type="text/javascript" src="/keybase/js/jspath.min.js"></script>
    <script type='text/javascript' src="http://cdnjs.cloudflare.com/ajax/libs/jquery-ajaxtransport-xdomainrequest/1.0.1/jquery.xdomainrequest.min.js"></script>
    <script type="text/javascript" src="/keybase/js/jquery-ui-widget.min.js"></script>
    <script type="text/javascript" src="/keybase/js/dynatree/jquery.dynatree.js"></script>
    <% if (params.controller == 'project' && params.action == 'show') { %>
    <script type="text/javascript">var project_id = <%=params.id%>;</script>
    <% } %>
    <% if (params.controller == 'key' && params.action == 'show') { %>
    <script type="text/javascript">var key_id = <%=params.id%>;</script>
    <% } %>
    <script type="text/javascript" src="/keybase/js/jquery.keybase.project.js"></script>
    <script type="text/javascript" src="/keybase/js/jquery.keybase.key.js"></script>
    <script type="text/javascript" src="/keybase/js/jquery.keybase.js"></script>
    <g:layoutHead/>
</head>
<body>

    <!-- KeyBase navbar -->
    <nav class="navbar navbar-default navbar-static-top keybase-nav">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="/keybase"><img alt="" src="/keybase/images/keybase-logo-blue-25.png" /></a>
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/keybase">KeyBase</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li><a href="/keybase/project">Projects</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Help</a></li>
                </ul>
                <!--ul class="nav navbar-nav navbar-right">
                    <li><a href="../navbar/">Default</a></li>
                    <li class="active"><a href="./">Static top <span class="sr-only">(current)</span></a></li>
                    <li><a href="../navbar-fixed-top/">Fixed top</a></li>
                </ul-->
            </div><!--/.nav-collapse -->
        </div>
    </nav>

    <g:layoutBody/>
</body>
</g:applyLayout>
