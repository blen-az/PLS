
def test_full_pipeline():
    from train import main
    main()
    assert os.path.exists("data/processed/train_data.csv")
    assert os.path.exists("models/scaler.pkl")