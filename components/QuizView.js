import React, { Component } from 'react'
import { View, Text, Animated, StyleSheet } from 'react-native'
import { getDeck } from '../utils/api'
import SubmitBtn from './SubmitBtn'
import { connect } from 'react-redux'
import {clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { purple, white, green, red } from '../utils/colors'
import * as Progress from 'react-native-progress'
 
class QuizView extends Component {
    
    state = {
        currentQuestion:0,
        correctAnswers:0,
        flip:false,
        fadeAnim: new Animated.Value(0)
    }
        
    flipCard = () => {
        this.setState(currState => ({flip: !currState.flip}))
    }
    
    correct = () => {
        this.setState(currState => (
            {correctAnswers: currState.correctAnswers+1,
            currentQuestion: currState.currentQuestion+1,
            }))
    }
    
    incorrect = () => {
        this.setState(currState => (
            {currentQuestion: currState.currentQuestion+1}))
    }
    
    fadeIn = () => {
      // Will change bounceValue value to 1 in 5 seconds
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 2000
      }).start();
    }
    handleRetakeQuiz = () => {
        const { navigation, deckId } = this.props
        //first go back:
        navigation.goBack()
        return navigation.navigate('QuizView', {deckId} )
    }
    
    handleBackToDeck = () => {
        const { navigation } = this.props
        navigation.goBack()
    }
    
    //clear today's notification and set a new one for tomorrow
    componentDidMount() {
         clearLocalNotification()
        .then(setLocalNotification)
    }
    
    
    render() {
        const {title} = this.props
        const questions = this.props.questions
        const qId = this.state.currentQuestion
        const answerBtnLabel = this.state.flip ? "Hide Answer" : "Show Answer"
        const totalQuestions = questions.length
                       
        if (qId === totalQuestions) {
            const score = Number(((this.state.correctAnswers / totalQuestions) * 100).toFixed(2))
            const {fadeAnim} = this.state
            this.fadeIn()
            return(
                    <View style={styles.container}>
                        <Text style={styles.title}>{`Quiz ${title}`}</Text>
                        <View style={styles.scoreContainer}>
                          <Text style={{fontSize:24, textAlign: 'center'}}>Your Final Score</Text>
                          <Animated.View
                            animation={this.fadeIn}
                            style={[
                              styles.fadingContainer,
                              {
                                opacity: fadeAnim // Bind opacity to animated value
                              }
                            ]}
                          >
                            <Text style={styles.fadingText}>{`${score}%`}</Text>
                          </Animated.View>
                        </View>
                        <SubmitBtn onPress={this.handleRetakeQuiz}>Retake Quiz</SubmitBtn>
                        <SubmitBtn onPress={this.handleBackToDeck}>Back to Deck</SubmitBtn>
                   </View>
                   )
        } else {
            const card = this.state.flip ? questions[qId].answer : questions[qId].question
            const counterLabel = `${qId + 1} of of ${totalQuestions} question(s)`
            const pct = (qId+1) / totalQuestions

            return(
               <View style={styles.container}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.card}>{card}</Text>
                    <SubmitBtn onPress={this.flipCard}>{answerBtnLabel}</SubmitBtn>
                    <SubmitBtn myStyle={{backgroundColor: green}} onPress={this.correct}>Correct</SubmitBtn>
                    <SubmitBtn myStyle={{backgroundColor: red}} onPress={this.incorrect}>Incorrect</SubmitBtn>
                   <View style={styles.progressBar}>
                        <Progress.Bar progress={pct} height={25} width={200} />
                   <Text style={{textAlign:'center'}}>{counterLabel}</Text>
                    </View>
               </View>
            )
        }
    }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#eaeaea",
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: purple,
    color: white,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
 card: {
    fontSize:32,
    textAlign: 'center',
    paddingVertical: 20,
 },
                
countContainer: {
  alignItems: "center",
  textAlign: "center",
  padding: 10,
  fontSize: 16,
},
scoreContainer: {
     flex: 1,
     justifyContent: 'center',
},
fadingContainer: {
  paddingVertical: 25,
  paddingHorizontal: 25,
  backgroundColor: 'powderblue'
},
fadingText: {
  fontSize: 80,
  color: 'purple',
  textAlign: 'center',
  margin: 10
},

progressBar: {
  fontSize: 100,
  color: 'purple',
  textAlign: 'center',
  margin: 10,
  justifyContent: 'center',
  paddingHorizontal: 85,
  paddingVertical: 20,
},

})
                           
function mapStateToProps(state, {route, navigation}) {
    const {deckId} = route.params
    const questions = state[deckId].questions
    const title = state[deckId].title
    return {
        questions,
        title,
        deckId,
        navigation,
    }
}

export default connect(mapStateToProps)(QuizView)
