class Notifier
    constructor: ->
        @_title = window.globalsData.appName
        @_icon = window.globalsData.notifierIcon
        @_closeDelay = window.globalsData.delays.notification

        @_isSupported = false
        @_isPermissed = false

        @_checkSupport()
        @_askPermission()

    notify: ( message ) ->
        return if not @_isSupported
        return if not @_isPermissed

        options =
            icon: @_icon
            body: message
            requireInteraction: false
        instance = new Notification(@_title, options)

        # init notification auto close
        setTimeout( instance.close.bind(instance), @_closeDelay)

    _checkSupport: ->
        @_isSupported = window.Notification isnt undefined
        if not @_isSupported
            console.warn('notifications API not supported')

    _askPermission: ->
        return if not @_isSupported
        isGranted = window.Notification.permission is 'granted'
        isDenied = window.Notification.permission is 'denied'

        # dont bother the user if already granted or denied permissions before
        if isGranted
            @_isPermissed = true
        else if isDenied
            console.warn('notifications permission denied')
        else
            Notification.requestPermission(@_onRequestPermission.bind(@))

    _onRequestPermission: ( permission ) ->
        @_isPermissed = permission is 'granted'
        if @_isPermissed
            console.warn('notifications permission granted :-*')

app.notifier = new Notifier()
