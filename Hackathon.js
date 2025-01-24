(function () {
    var ChaHeader = function (element) {
      this.element = element;
      this.sections = document.getElementsByClassName("js-cha-section");
      this.header = this.element.getElementsByClassName("js-cha-header")[0];
      // handle mobile behaviour
      this.headerTrigger = this.element.getElementsByClassName(
        "js-cha-header__trigger"
      );
      this.modal = document.getElementsByClassName("js-cha-modal");
      this.focusMenu = false;
      this.firstFocusable = null;
      this.lastFocusable = null;
      this.visibleClass = "cd-block";
      initChaHeader(this);
    };
  
    function initChaHeader(element) {
      // set initial status
      for (var j = 0; j < element.sections.length; j++) {
        initSection(element, j);
      }
  
      // handle mobile behaviour
      if (element.headerTrigger.length > 0) {
        initMobileVersion(element);
      }
  
      // make sure header element is visible when in focus
      element.header.addEventListener("focusin", function (event) {
        checkHeaderVisible(element);
      });
    }
  
    function initSection(element, index) {
      // clone header element inside each section
      var cloneItem =
        index == 0 ? element.element : element.element.cloneNode(true);
      cloneItem.classList.remove("js-cha-header-clip");
      var customClasses = element.sections[index].getAttribute(
        "data-header-class"
      );
      // hide clones to SR
      cloneItem.setAttribute("aria-hidden", "true");
      if (customClasses)
        addHeaderClass(
          cloneItem.getElementsByClassName("js-cha-header")[0],
          customClasses
        );
      // keyborad users - make sure cloned items are not tabbable
      if (index != 0) {
        // reset tab index
        resetTabIndex(cloneItem);
        element.sections[index].insertBefore(
          cloneItem,
          element.sections[index].firstChild
        );
      }
    }
  
    function addHeaderClass(el, classes) {
      var classList = classes.split(" ");
      el.classList.add(classList[0]);
      if (classList.length > 1) addHeaderClass(el, classList.slice(1).join(" "));
    }
  
    function resetTabIndex(clone) {
      var focusable = clone.querySelectorAll("[href], button, input");
      for (var i = 0; i < focusable.length; i++) {
        focusable[i].setAttribute("tabindex", "-1");
      }
    }
  
    function initMobileVersion(element) {
      //detect click on nav trigger
      var triggers = document.getElementsByClassName("js-cha-header__trigger");
      for (var i = 0; i < triggers.length; i++) {
        triggers[i].addEventListener("click", function (event) {
          event.preventDefault();
          var ariaExpanded = !element.modal[0].classList.contains(
            element.visibleClass
          );
          //show nav and update button aria value
          element.modal[0].classList.toggle(element.visibleClass, ariaExpanded);
          element.headerTrigger[0].setAttribute("aria-expanded", ariaExpanded);
          if (ariaExpanded) {
            //opening menu -> move focus to first element inside nav
            getFocusableElements(element);
            element.firstFocusable.focus();
          } else if (element.focusMenu) {
            if (window.scrollY < element.focusMenu.offsetTop)
              element.focusMenu.focus();
            element.focusMenu = false;
          }
        });
      }
  
      // close modal on click
      element.modal[0].addEventListener("click", function (event) {
        if (!event.target.closest(".js-cha-modal__close")) return;
        closeModal(element);
      });
  
      // listen for key events
      window.addEventListener("keydown", function (event) {
        // listen for esc key
        if (
          (event.keyCode && event.keyCode == 27) ||
          (event.key && event.key.toLowerCase() == "escape")
        ) {
          // close navigation on mobile if open
          if (
            element.headerTrigger[0].getAttribute("aria-expanded") == "true" &&
            isVisible(element.headerTrigger[0])
          ) {
            closeModal(element);
          }
        }
        // listen for tab key
        if (
          (event.keyCode && event.keyCode == 9) ||
          (event.key && event.key.toLowerCase() == "tab")
        ) {
          trapFocus(element, event);
        }
      });
    }
  
    function closeModal(element) {
      element.focusMenu = element.headerTrigger[0]; // move focus to menu trigger when menu is close
      element.headerTrigger[0].click();
    }
  
    function trapFocus(element, event) {
      if (element.firstFocusable == document.activeElement && event.shiftKey) {
        //on Shift+Tab -> focus last focusable element when focus moves out of modal
        event.preventDefault();
        element.lastFocusable.focus();
      }
      if (element.lastFocusable == document.activeElement && !event.shiftKey) {
        //on Tab -> focus first focusable element when focus moves out of modal
        event.preventDefault();
        element.firstFocusable.focus();
      }
    }
  
    function getFocusableElements(element) {
      //get all focusable elements inside the modal
      var allFocusable = element.modal[0].querySelectorAll(
        '[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary'
      );
      getFirstVisible(element, allFocusable);
      getLastVisible(element, allFocusable);
    }
  
    function getFirstVisible(element, elements) {
      //get first visible focusable element inside the modal
      for (var i = 0; i < elements.length; i++) {
        if (
          elements[i].offsetWidth ||
          elements[i].offsetHeight ||
          elements[i].getClientRects().length
        ) {
          element.firstFocusable = elements[i];
          return true;
        }
      }
    }
  
    function getLastVisible(element, elements) {
      //get last visible focusable element inside the modal
      for (var i = elements.length - 1; i >= 0; i--) {
        if (
          elements[i].offsetWidth ||
          elements[i].offsetHeight ||
          elements[i].getClientRects().length
        ) {
          element.lastFocusable = elements[i];
          return true;
        }
      }
    }
  
    function checkHeaderVisible(element) {
      if (
        window.scrollY >
        element.sections[0].offsetHeight - element.header.offsetHeight
      )
        window.scrollTo(0, 0);
    }
  
    function isVisible(element) {
      return (
        element.offsetWidth ||
        element.offsetHeight ||
        element.getClientRects().length
      );
    }
  
    // init the ChaHeader Object
    var chaHader = document.getElementsByClassName("js-cha-header-clip"),
      clipPathSupported =
        CSS.supports(
          "clip-path",
          "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
        ) ||
        CSS.supports(
          "-webkit-clip-path",
          "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
        );
    if (chaHader.length > 0 && clipPathSupported) {
      for (var i = 0; i < chaHader.length; i++) {
        new ChaHeader(chaHader[i]);
      }
    }
  })();

  