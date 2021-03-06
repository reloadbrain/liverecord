<div class="signinform" ng-cloak="">
  <h3 ng-bind="'Join'|translate"></h3>
  <div class="sso">
    <span ng-bind="'Sign in with'|translate"></span>
    <a href="/api/oauth/facebook/" class="text-facebook" target="_top"><i class="fa fa-fw fa-facebook-official"></i></a>
    <a href="/api/oauth/twitter/" class="text-twitter" target="_top"><i class="fa fa-fw fa-twitter"></i></a>
    <a href="/api/oauth/windowslive/" class="text-windows" target="_top"><i class="fa fa-fw fa-windows"></i></a>
    <a href="/api/oauth/vkontakte/" class="text-vk" target="_top"><i class="fa fa-fw fa-vk"></i></a>
    <a href="/api/oauth/github/" class="text-github" target="_top"><i class="fa fa-fw fa-github"></i></a>
    <a href="/api/oauth/google/" class="text-google" target="_top"><i class="fa fa-fw fa-google-plus-square"></i></a>
  </div>
  <hr size="1">
  <p ng-bind="'Signin or signup'|translate"></p>
  <div class="message" ng-show="message" ng-bind="message"></div>
  <form>
    <div>
      <label for="email" ng-bind="'Email'|translate"></label>
      <input type="email" id="email" ng-model="authData.email"
        required placeholder="{{'Email'|translate}}" ng-disabled="sending">
    </div>
    <div>
      <label for="password" ng-bind="'Password'|translate"></label>
      <input type="password" id="password"
          ng-model="authData.password" required
          placeholder="{{'Password'|translate}}" ng-disabled="sending">
    </div>
    <div>
      <label>
        <a href="/users/password/restore" class="small" ng-disabled="sending" ng-bind="'Restore'|translate"></a>
      </label>
      <label for="rememberMe" ng-bind="'My Comp'|translate"></label>
      <input type="checkbox" ng-model="authData.rememberMe"
         name="remember" id="rememberMe" ng-disabled="sending">
    </div>
    <div></div>
    <div>
      <label></label>
      <input type="submit" ng-click="auth()" value="{{'Join'|translate}}" ng-disabled="sending">
    </div>
  </form>

</div>
