<div class="topic-view" ng-class="{advancedcompose: advancedCompose}">
  <div class="topic" id="topic">
    <div class="details">
      <h1>{{topic.title}}</h1>


      <div class="topic-body" ng-bind-html="topic.body">
      </div>

      <div class="flex-row topic-authoring">
        <div class="col">
          <a href="/users/{{topic.user.slug}}"><img ng-src="{{topic.user.picture}}" class="img-responsive"></a>
        </div>
        <div class="col">
          <a href="/users/{{topic.user.slug}}">{{topic.user.name}}</a>
        </div>
        <div class="col">
          <span class="date" title="{{topic.created | date: 'medium'}}">{{topic.created | date:'short'}}</span>
        </div>
      </div>
    </div>

    <div class="comments">
      <bookmark topic="topic"></bookmark>


      <div class="comments-list" ng-init="firstUser=''" id="commentsList">
        <div class="comment flex-row"
             ng-repeat="comment in (preparedComments = (comments | unique:'_id' | orderBy:'updated'))"
             ng-class="{me: comment.user._id === user._id}">
          <div class="avatar">
            <a href="/users/{{comment.user.slug}}"><img ng-src="{{comment.user.picture}}" class="img-responsive"
                 ng-hide="{{preparedComments[$index-1].user._id == comment.user._id}}"></a>
          </div>
          <div class="flex-column comment-details">
            <div class="author" ng-hide="{{preparedComments[$index-1].user._id == comment.user._id}}">
              <a href="/users/{{comment.user.slug}}">{{comment.user.name}}</a>
            </div>
            <div class="text" ng-bind-html="comment.body"></div>
          </div>
          <div class="date">
            <span class="time"
                  title="{{comment.created | date: 'medium'}}">{{comment.created | date:'shortTime'}}</span>
          </div>
        </div>
      </div>

      <div class="flex-center flex-row">
        <div class="typists">
          <div class="list" ng-show="typists.numberOfKeys()">
            <div class="starter"><i class="fa fa-pencil"></i></div>
            <div class="typist" ng-repeat="typist in typists"><img ng-src="{{typist.picture}}" alt="{{typist.name}}"
                                                                   title="{{typist.name}}" class="img-responsive"></div>
          </div>
        </div>
      </div>
      <div class="join flex-center" ng-hide="user">
        <div class="welcoming">Интересуетесь темой? Есть, что добавить?</div>
        <div class="flex-row flex-center">
          <users-login-form></users-login-form>
        </div>
      </div>

    </div>
  </div>

  <div class="compose flex-row" ng-class="{sending: sending}" ng-show="user">
    <div class="controls">
      <button ng-click="switchAdvancedCompose()" ng-disabled="sending">
        <i class="fa " ng-class="advancedCompose ? 'fa-minus' : 'fa-plus'"></i>
      </button>
    </div>
    <div class="text">
      <textarea
              name="comment" id="comment" class="mono"
              ng-model="commentText" ng-disabled="sending" ng-keydown="commentKeyDown($event)"
              cols="20" rows="1"
              placeholder="Новое сообщение"></textarea>
      <div class="toolbar small" ng-show="advancedCompose">
        <small><input type="file" id="siofu_input" />  Поддерживаются теги:
          <kbd>b</kbd>,
          <kbd>i</kbd>,
          <kbd>a</kbd>,
          <kbd>img</kbd>,
          <kbd>code</kbd>,
          <kbd>pre</kbd></small>
      </div>
    </div>
    <div class="send">
      <button ng-click="sendComment()" ng-disabled="!sendButtonActive"
              title="Нажмите Ctrl+Enter (или Cmd+Enter) для отправки">
        <i class="fa fa-paper-plane"></i>
      </button>
    </div>
  </div>

</div>


