import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { hideRoundDialog } from '../../../../store/rounds/actions';

import { AppStateType } from '../../../../store/types';
import { Round } from '../../../../store/rounds/types';

import { SelectedRoundTable } from './SelectedRoundTable';

interface PropTypes {
	showRoundDialog: boolean;
	round: Round;
	hideRoundDialog: Function;
}

export const SelectedRoundComponent: React.FC<PropTypes> = ({
	showRoundDialog,
	round,
	hideRoundDialog
}) => (
	<Dialog
		open={showRoundDialog}
		onClose={(event) => hideRoundDialog()}
		maxWidth="md"
		fullWidth={true}
	>
		<DialogTitle>
			{round
				? round.date.split(' ')[0] +
				  (round.roundData ? ' - ' + round.roundData['course_name'] : '')
				: ''}
		</DialogTitle>
		<DialogContent>
			<SelectedRoundTable />
			{round ? (
				<div style={{ paddingTop: '20px', marginBottom: '-20px' }}>
					<DialogContentText>
						<span style={{ fontSize: '0.9em' }}>
							{round.roundData ? round.roundData.notes : ''}
						</span>
					</DialogContentText>
				</div>
			) : null}
		</DialogContent>
		<DialogActions>
			<Button
				variant="outlined"
				style={{ marginTop: '10px' }}
				onClick={(event) => hideRoundDialog()}
			>
				close
			</Button>
		</DialogActions>
	</Dialog>
);

const mapStateToProps = (state: AppStateType) => ({
	showRoundDialog: state.rounds.showRoundDialog,
	round: state.rounds.data[state.rounds.selectedRoundIndex]
});

const mapDispatchToProps = (
	dispatch: ThunkDispatch<AppStateType, null, AnyAction>
) => ({
	hideRoundDialog: () => dispatch(hideRoundDialog())
});

export const SelectedRound = connect(
	mapStateToProps,
	mapDispatchToProps
)(SelectedRoundComponent);
