module.exports = function(data, Components){
  const routes = (
    <Route path="/" data={data} component={Components.App}>
      <Route path="about" component={Components.Default}/>
      <Route path="contact" component={Components.Default}/>
      <Route path="work" component={Components.Work}/>
      <Route path="/work/:slug" component={Components.Work}/>
      <Route path="/blog/:slug" component={Components.Blog}/>
      <IndexRoute component={Components.Blog}/>
      <Route path="*" component={Components.NoMatch}/>
    </Route>
  )
  return routes
}