<template>
    <div>
        <div class="stage text">
            <img src="./assets/logo128.png" />
        </div>
        <div class="stage"><small>Loading in progress</small></div>
        <div class="stage">
            <div class="dot-bricks"></div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
}
</script>

<style scoped>
.text {
    margin: 20% -5% 10px -5% !important;
}

img {
    -webkit-filter: drop-shadow(2px 2px 2px #222);
    filter: drop-shadow(0px 0px 2px #111);
}
.stage {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 10px 0;
    margin: 0 -5%;
    overflow: hidden;
  }

.dot-bricks {
    position: relative;
    top: 8px;
    left: -9999px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #ebebeb;
    color: #ebebeb;
    box-shadow: 9991px -16px 0 0 #ebebeb, 9991px 0 0 0 #ebebeb, 10007px 0 0 0 #ebebeb;
    animation: dot-bricks 2s infinite ease;
}

@keyframes dot-bricks {
    0% {
    box-shadow: 9991px -16px 0 0 #ebebeb, 9991px 0 0 0 #ebebeb, 10007px 0 0 0 #ebebeb;
    }
    8.333% {
    box-shadow: 10007px -16px 0 0 #ebebeb, 9991px 0 0 0 #ebebeb, 10007px 0 0 0 #ebebeb;
    }
    16.667% {
    box-shadow: 10007px -16px 0 0 #ebebeb, 9991px -16px 0 0 #ebebeb, 10007px 0 0 0 #ebebeb;
    }
    25% {
    box-shadow: 10007px -16px 0 0 #ebebeb, 9991px -16px 0 0 #ebebeb, 9991px 0 0 0 #ebebeb;
    }
    33.333% {
    box-shadow: 10007px 0 0 0 #ebebeb, 9991px -16px 0 0 #ebebeb, 9991px 0 0 0 #ebebeb;
    }
    41.667% {
    box-shadow: 10007px 0 0 0 #ebebeb, 10007px -16px 0 0 #ebebeb, 9991px 0 0 0 #ebebeb;
    }
    50% {
    box-shadow: 10007px 0 0 0 #ebebeb, 10007px -16px 0 0 #ebebeb, 9991px -16px 0 0 #ebebeb;
    }
    58.333% {
    box-shadow: 9991px 0 0 0 #ebebeb, 10007px -16px 0 0 #ebebeb, 9991px -16px 0 0 #ebebeb;
    }
    66.666% {
    box-shadow: 9991px 0 0 0 #ebebeb, 10007px 0 0 0 #ebebeb, 9991px -16px 0 0 #ebebeb;
    }
    75% {
    box-shadow: 9991px 0 0 0 #ebebeb, 10007px 0 0 0 #ebebeb, 10007px -16px 0 0 #ebebeb;
    }
    83.333% {
    box-shadow: 9991px -16px 0 0 #ebebeb, 10007px 0 0 0 #ebebeb, 10007px -16px 0 0 #ebebeb;
    }
    91.667% {
    box-shadow: 9991px -16px 0 0 #ebebeb, 9991px 0 0 0 #ebebeb, 10007px -16px 0 0 #ebebeb;
    }
    100% {
    box-shadow: 9991px -16px 0 0 #ebebeb, 9991px 0 0 0 #ebebeb, 10007px 0 0 0 #ebebeb;
    }
}
</style>