<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
<body>
<h1>BRANCH DATA</h1>
 	<table border="1">
  	<tr>
    		<th style="text-align:left">no</th>
    		<th style="text-align:left">pincode</th>
    		<th style="text-align:left">mobileno</th>
    		<th style="text-align:left">name</th>
  	</tr>
  	<xsl:for-each select="branch/place">
  	<tr>
   		<td><xsl:value-of select="no"/></td>
   		<td><xsl:value-of select="pincode"/></td>
   		<td><xsl:value-of select="mobileno"/></td>
   		<td><xsl:value-of select="name"/></td>
   	</tr>
  	</xsl:for-each>
	</table> 
	</body>
</html>
</xsl:template>
</xsl:stylesheet>
